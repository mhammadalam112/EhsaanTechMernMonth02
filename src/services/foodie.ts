const foodieRepo = require('../repositories/foodie');

async function getFoodieByUsername(userName: string) {
    const rows = await foodieRepo.getFoodieByUsername(userName);
    return rows;
};

interface insertObject {
    first_name: string;
    last_name: string;
    username: string; 
    password: string; 
}

async function createFoodie(insertObject: insertObject) {
    await foodieRepo.createFoodie(insertObject);
};


export {
    getFoodieByUsername,
    createFoodie
};