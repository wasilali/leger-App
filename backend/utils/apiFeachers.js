class ApiFeachers {
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                //regex is regular expression i==koi bra chota search krna ka leya plus mongodb rull $ sign use krna ha,
                $regex:this.queryStr.keyword,
                $options:"i",
                
            }
        }:{};
console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy={...this.queryStr};
        
        //  REMOVE FIELDS FORM CATEHORYS
        const removeFields=["keyword","page","limit"];

        removeFields.forEach(key=>delete queryCopy[key]);

        //filter for price and rating,

        console.log(queryCopy)

        let querystr=JSON.stringify(queryCopy);
        //regular expressions,
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)

        this.query= this.query.find(JSON.parse(querystr));

        console.log(querystr)
        return this;
    }
    pagination(resultPrPage){
        const currentPage=Number(this.queryStr.page)||1;

        const skip = resultPrPage*(currentPage-1);

        this.query=this.query.limit(resultPrPage)
        .skip(skip)
        return this;
    }
}




module.exports=ApiFeachers