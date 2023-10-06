import Image from 'next/image'

export const GoogleLogo = (props) => {
  const { ...other } = props;
  return (
    <Image width={20} height={20} {...other} src="/assets/google-logo-png.png" alt="Google" />
  );
};
