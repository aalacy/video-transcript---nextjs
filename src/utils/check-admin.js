export const dedupeArrayOfObjects = (items, key = "id") => {
  const uniqueIds = new Set();

  return items?.filter((element) => {
    const isDuplicate = uniqueIds.has(element[key]);

    uniqueIds.add(element[key]);

    return !isDuplicate;
  });
};

export const checkAdmin = (user) => {
  return (
    user?.roles
      ?.map((role) => role.name)
      .findIndex((name) => name === RoleType.SUPER_ADMIN) !== -1
  );
};

export const parsePageAccess = (user, path) => {
  if (!user?.roles?.length) return null;

  const rolesResources = user.roles
    ?.filter((role) => role.roleResources)
    .map((role) => role.roleResources)
    .flat();
  const resourcesResource = dedupeArrayOfObjects(rolesResources);
  const resource = resources.find(
    (res) =>
      res.resource.path === path ||
      (res.resource.path !== "/" && res.resource.path.includes(path)),
  );
  return resource;
};

export const canUpdatePage = (user, path) => {
  if (checkAdmin(user)) return true;

  const resource = parsePageAccess(user, path);
  if (!resource) return false;

  return resource.hasFull || resource.hasUpdate;
};

export const canDeletePage = (user, path) => {
  if (checkAdmin(user)) return true;

  const resource = parsePageAccess(user, path);
  if (!resource) return false;

  return resource.hasFull || resource.hasDelete;
};

export const canAccessPage = (user, path) => {
  if (!user?.roles?.length) return true;

  if (checkAdmin(user)) return true;

  const rolesResources = user.roles
    ?.filter((role) => role.roleResources)
    .map((role) => role.roleResources)
    .flat();
  const resourcesResource  = dedupeArrayOfObjects(rolesResources);

  let canAccess = false;
  for (let res of resources) {
    if (res.resource.path === path) {
      canAccess = res.hasFull || res.hasView;
      break;
    } else if (res.resource.path !== "/" && res.resource.path.includes(path)) {
      canAccess = res.hasFull || res.hasView;
    }
  }

  return canAccess;
};
