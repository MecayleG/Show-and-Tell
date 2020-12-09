module.exports = function Fruits(pool) {
    
    async function insertFruit (fruit){
        const fruitInsert = await pool.query("select fruit_name from fruit where fruit_name = $1",[fruit])
        if (fruitInsert.rows.id===1){
            console.log(fruitInsert.rows.id)
        }
       return fruitInsert.rows
    }





    return{
        insertFruit
    }

}