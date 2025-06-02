import { Billboard as BillboardType } from "@/types";
import ImageSlider from "./ui/image-slider";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {

  return (
    <div className="p-4 sm:p-5 lg:p-8 rounded-xl overflow-hidden">
      <ImageSlider sliderData={data?.images} />
    </div>
  );
};

export default Billboard;
