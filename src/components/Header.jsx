import Button from "./ui/Button";
import LoginForm from "./Login-Form";
export default function Header() {
  return (
    <header>
      <div className="bg-black w-full flex justify-between p-[3%] text-white ">
        <Button className="text-4xl">NOTES APP</Button>
        <Button>SIGN IN</Button>
      </div>
    </header>
  );
}
