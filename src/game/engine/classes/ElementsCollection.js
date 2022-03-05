class ElementsCollection extends Array{
    constructor(...args){
        super(...args)
        this.latestId = 0;
    }
    add(...elements){
        elements.forEach((e)=>{
            this.latestId +=1;
            e.id = this.latestId
            this.push(e)
        })
    }
    remove(...ids){
        ids.forEach((id)=>{
           this.forEach((e,i)=>{
               if(e.id === id){
                   this.splice(i,1)
               }
           }) 
        })
    }
}
export default ElementsCollection;