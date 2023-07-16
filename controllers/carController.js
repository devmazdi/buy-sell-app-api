import handleAsyncErrors from "../middlewares/handleAsyncErrors.js";
import Car from "../models/carModel.js";
import ApiFilters from "../utils/ApiFilters.js";
/**
 * @path /api/v1/car/new
 * @description add new car
 * @method POST
 */
const addCar = handleAsyncErrors(async(req, res, next) =>{
    const newCar = await Car.create(req.body);
    res.status(200).send({
        success: true,
        message: "post added successfully",
        data: newCar
    })
});
/**
 * @path /api/v1/cars
 * @description get cars
 * @method GET
 */
const getCars = handleAsyncErrors(async(req, res, next) => {
    const filterData = new ApiFilters(Car.find(), req.query).filter();
    const getCars = await filterData.data;
    res.status(200).send({
        success: true,
        count: getCars.length,
        cars: getCars
    })
});

export {
    addCar,
    getCars
}