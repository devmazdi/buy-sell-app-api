class ApiFilters {
    constructor(data, queryStr){
        this.data = data;
        this.queryStr = queryStr;
    }
    filter(){
        const cqStr = {...this.queryStr};
      
        const removeFields = ['sort', 's', 'limit', 'page'];
        removeFields.forEach(el => delete cqStr[el]);

        let qSrt = JSON.stringify(cqStr);

        // Advance filters lt, lte, gt, gte, in
        qSrt = qSrt.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        this.data = this.data.find(JSON.parse(qSrt));
        return this;
    }
}

export default ApiFilters;