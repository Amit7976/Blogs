import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImSearch } from "react-icons/im";

function MainBigSearchBar() {
  return (
    <>
      <div
        className="bg-white rounded-full pr-10 py-2.5 w-full max-w-5xl mx-auto flex items-center gap-0 font-medium placeholder:text-gray-300"
        style={{ boxShadow: "0 25px 60px rgba(113,106,147,.2)" }}
      >
        <div className="items-center w-full flex">
          <ImSearch className="text-3xl font-semibold col-span-1 mx-auto text-gray-400 w-20 pl-5 pr-2" />
          <div className="w-full">
            <Input
              type="text"
              placeholder="Skills / Designations / Companies"
              className="text-lg pr-0 border-none shadow-none py-6"
            />
          </div>
          <Separator orientation="vertical" className="border h-6 mx-4" />
          <div className="w-1/2">
            <Input
              type="text"
              placeholder="Job Location"
              className="text-lg pr-0 border-none shadow-none py-6"
            />
          </div>
          <Separator orientation="vertical" className="border h-6 mx-4" />
          <div className="w-1/2">
            <Select>
              <SelectTrigger className="gap-3 w-40 border-none outline-none focus:ring-0 text-lg text-gray-500 py-6">
                <SelectValue placeholder="Select Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="Woman">Woman</SelectItem>
                <SelectItem value="Part Time">Part Time</SelectItem>
                <SelectItem value="Full Time">Full Time</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant={"default"}
          size={"lg"}
          className="col-span-2 font-medium text-base border-2 border-transparent bg-[#FC4B05] hover:bg-gray-100 hover:text-[#FC4B05] hover:border-[#FC4B05]"
        >
          Search
        </Button>
      </div>
    </>
  );
}

export default MainBigSearchBar;
