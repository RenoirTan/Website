import { BsWrench } from "react-icons/bs";
import ButtonCell from "./button-cell";

export default function WipCell() {
  return <ButtonCell
    caption="WIP"
    childYDisplacement="md:mt-[1.4rem]"
  >
    <span className="text-center text-3xl"><BsWrench /></span>
  </ButtonCell>;
}