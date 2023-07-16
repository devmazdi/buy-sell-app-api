import { Schema, model } from "mongoose";
const  carSchema = new Schema({
    title: {
        type: String,
        required:[true, 'Please Provide Title.']
    },
    slug: String,
    area:{
        type: String
    },
    vehicle_type:{
        type: String,
        required: [true,'Please Provide Vehicle Type']
    },
    brand_name:{
        type: String,
        required: [true,'Please Provide Brand Name']
    },
    vehicle_model:{
        type: String,
        required: [true,'Please Provide Vehicle Model']
    },
    edition: String,
    made_year: {
        type: Number,
        required: [true, 'Please provide made year']
    },
    transmission:{
        type: String,
        enum:{
            values: ['automatic', 'manual'],
            message: 'Please Select One'
        }
    },
    condition:{
        type: String,
        enum:{
            values: ['Used', 'New', 'Recondition'],
            message: 'Please Select One'
        }
    },
    fuel_type: String,
    engine_capacity: String,
    kilometers_run: Number,
    price: Number,
    is_negotiable:{
        type: Boolean,
        default: false
    },
    is_sold:{
        type: Boolean,
        default: false
    },
    contract_number: String,
    seller_address: String,
    gallery_list: [String],
    description: String
},{timestamps: true});

carSchema.pre('save', function(next){
    this.slug = this.title.toLowerCase().replace(/[^A-Za-z0-9\-]/, '').replace(/\s+/g, '-') + this._id;
    next();
});

export default model('Car', carSchema);