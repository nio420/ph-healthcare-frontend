import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return <Image src="/logo.png" alt="Ph healtcare Logo" width={20} height={20} priority />;
};

export default Logo;
