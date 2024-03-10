import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../shared/SectionTitle";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {

    const {register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data);
        // image upload to imgbb and then get an url
        const imageFile = {image : data.image[0]};
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            // todo: send menu item data to the server with image url
            const menuItem = {
                name : data.name, 
                category : data.category,
                price : parseFloat(data.price),
                recipe: data.recipe, 
                image: res.data.data.display_url,
            }
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);

            if(menuRes.data.insertedId){
                // console.log("menu item added to the database")
                // reset();
                Swal.fire({
                    title: "Recipe Added!",
                    text: `${data.name} is added to the menu.`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                // navigate('/');
            }
        }
        console.log("wiht img url", res.data);
    }

    return (
        <div>
            <SectionTitle heading='add an item' subHeading="What's new" ></SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" placeholder="Type here" 
                        {...register("name", { required: true })}
                        className="input input-bordered w-full" />
                    </div>

                    <div className="flex gap-x-4">
                        {/* Category */}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register("category")} 
                                className="select select-bordered w-full">
                                <option disabled value="default" className="text-slate-400">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        {/* Price */}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="text" placeholder="Price" 
                            {...register("price", { required: true })}
                            className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea
                        {...register("recipe", { required: true })}
                        className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    </div>
                    {/* image */}

                    <div className="form-control w-full my-4">
                        <input type="file" {...register("image", { required: true })} 
                        className="file-input w-full max-w-xs" />
                    </div>

                    {/* button */}
                    <button className="btn btn-warning">
                        Add Item <FaUtensils className="ml-4"></FaUtensils>
                        </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;