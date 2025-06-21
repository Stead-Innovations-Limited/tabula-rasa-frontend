import { HiPlus, SlHeart,LuShoppingCart, LuBell } from "@/components/icons";
import AvatarComponent from "../reusable-ui/AvatarComponent";

function AuthNavNoSearch() {
  return (
    <div className='w-full bg-olive'>
      <header className='w-full xl:max-w-[1140px] mx-auto flex flex-row justify-between items-center p-5 lg:px-5 text-white'>
        <h1 className='font-alex text-3xl lg:text-5xl'>
          Tabula Rasa
        </h1>
        <nav className="">
          <ul className='flex items-center gap-8 font-roboto font-normal text-2xl'>
            <li className="hidden md:block">
              <HiPlus className='size-6' />
            </li>
            <li className="hidden md:block">
              <SlHeart className='size-6' />
            </li>
            <li className="hidden md:block">
              <LuShoppingCart className='size-6' />
            </li>
            <li className="hidden md:block">
              <LuBell className='size-6' />
            </li>
            <li>
              <AvatarComponent imgUrl="https://github.com/shadcn.png" firstname="Tolu" lastname="Ojo" />
            </li>
          </ul>

        </nav>
      </header>
    </div>
  );
}

export default AuthNavNoSearch;
