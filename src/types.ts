export type Fish = {
  name: string;
  price: number;
  status: string;
  desc: string;
  image: string;
};

export type HeaderProps = {
  tagline: string;
};

export type FishProps = {
  addToOrder(index: string): void;
  index: string;
  details: {
    image: string;
    name: string;
    desc: string;
    status: string;
    price: number;
  };
};

export type AddFishFormProps = {
  addFish({ name, price, status, desc, image }: Fish): void;
};

export type EditFishFormProps = {
  updateFish(index: string, updatedFish: Fish): void;
  deleteFish(index: string): void;
  index: string;
  fish: {
    name: string;
    price: number;
    status: string;
    desc: string;
    image: string;
  };
};

export type InventoryProps = {
  fishes: [Fish];
  addFish(fish: Fish): void;
  updateFish(key: string, updatedFish: Fish): void;
  deleteFish(key: string): void;
  loadSampleFishes(): void;
  storeId: string;
};

export type OrderProps = {
  fishes: [Fish];
  order: [Order];
  deleteOrder(id: string): void;
};

export type LoginProps = {
  authenticate(AuthProvider: AuthProviders): void;
};

export type AuthProviders = "Github" | "Twitter" | "Google";
