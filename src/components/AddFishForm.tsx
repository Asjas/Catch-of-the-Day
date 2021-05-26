import { FormEvent, useRef } from "react";

interface Fish {
  name: string;
  price: number;
  status: string;
  desc: string;
  image: string;
}

type AddFishFormProps = {
  addFish({ name, price, status, desc, image }: Fish): void;
};

function AddFishForm({ addFish }: AddFishFormProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  function createFish(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const fish = {
      name: nameRef.current?.value ?? "",
      price: parseFloat(priceRef.current?.value ?? ""),
      status: statusRef.current?.value ?? "",
      desc: descRef.current?.value ?? "",
      image: imageRef.current?.value ?? "",
    };

    if (fish) {
      addFish(fish);
    }

    event.currentTarget.reset();
  }

  return (
    <form className="fish-edit" onSubmit={createFish}>
      <input name="name" ref={nameRef} type="text" placeholder="Name" />
      <input name="price" ref={priceRef} type="text" placeholder="Price" />
      <select name="status" ref={statusRef}>
        <option value="available">Fresh</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" ref={descRef} placeholder="Description" />
      <input name="image" ref={imageRef} type="text" placeholder="Image" />
      <button type="submit">Add Fish</button>
    </form>
  );
}

export default AddFishForm;
