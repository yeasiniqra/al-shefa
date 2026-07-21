import Logo from "./Logo";
import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";

export default function MainHeader({ categories }) {
  return (
    <div className="main-header">
      <div className="container main-header__inner">
        <Logo />
        <SearchBar categories={categories} />
        <HeaderActions />
      </div>
    </div>
  );
}
