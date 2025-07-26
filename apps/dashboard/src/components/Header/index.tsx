import profileIcon from '../../assets/svg/profile-icon.svg';
import { MobileMenu } from '../MobileMenu';

export type THeader = {
  nameUser: string;
};

const Header = ({ nameUser }: THeader) => {
  return (
    <header className="flex justify-between items-center bg-primary h-[96px] p-1.5 fixed w-full z-30 shadow-[0px_2px_10px_1px_rgba(0,0,0,0.75)]">
      <div className="max-w-[80%] m-auto w-full max-lg:max-w-full px-[15px] max-md:flex max-md:items-center">
        <MobileMenu />
        <div className="flex justify-end items-center gap-10 w-full">
          <p className="font-bold text-sm font-family-base text-white hidden md:block">
            {nameUser}
          </p>
          <div className="relative">
            <img width={40} height={40} src={profileIcon} alt="Minha conta" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
