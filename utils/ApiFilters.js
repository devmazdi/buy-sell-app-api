class ApiFilters {
    constructor(data, queryStr){
        this.data = data;
        this.queryStr = queryStr;
    }
    filter(){
        const cqStr = {...this.queryStr};
      
        const removeFields = ['sort', 's', 'limit', 'page', 'fields'];
        removeFields.forEach(el => delete cqStr[el]);

        let qSrt = JSON.stringify(cqStr);

        // Advance filters lt, lte, gt, gte, in
        qSrt = qSrt.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        console.log(JSON.parse(qSrt));
        this.data = this.data.find(JSON.parse(qSrt));
        return this;
    }

    sort(){
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.data = this.data.sort(sortBy);
        }else{
            this.data = this.data.sort('-createdAt'); 
        }

        return this;
    }
    search(){
        if(this.queryStr.s){
            let sq = this.queryStr.s.split('-').join(' ');
            this.data = this.data.find({$text: {$search: sq}});
        }

        return this
    }

    limitFields() {
        if(this.queryStr.fields){
            let fields = this.queryStr.fields.split(',').join(' ');
            this.data = this.data.select(fields);
        }else{
            this.data = this.data.select('-__v');
        }
        return this        
    }

    pagination(){
        const page = this.queryStr.page || 1;
        const limit = this.queryStr.limit || 100;
        const skipResults = (page - 1) * limit;
        
        this.data = this.data.skip(skipResults).limit(limit);

        return this
    }
}

export default ApiFilters;