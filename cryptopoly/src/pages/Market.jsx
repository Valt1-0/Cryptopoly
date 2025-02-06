import Card from "../components/Card";


import hotel from "../assets/models/hotel.glb";
import house1 from "../assets/models/house1.glb";
import house2 from "../assets/models/house2.glb";
import train from "../assets/models/train.glb";

const houses = [
  {
    id: 1,
    title: "Modern Villa",
    price: 4,
    modelPath: car,
  },
  {
    id: 2,
    title: "Cozy Cabin",
    price: 2,
    modelPath: ship,
  },
  {
    id: 3,
    title: "Luxury Mansion",
    price: 7,
    modelPath: car,
  },
];

const Market = () => {
  return (
    <div className=" bg-background-light flex flex-wrap gap-6 justify-center p-6">
      {houses.map((house) => (
        <Card
          key={house.id}
          title={house.title}
          price={house.price}
          modelPath={house.modelPath}
        />
      ))}
    </div>
  );
};

export default Market;
