const foodieRepo = require('../repositories/foodie');

async function getFoodieByUsername(userName: string) {
    const rows = await foodieRepo.getFoodieByUsername(userName);
    return rows;
};

async function createFoodie(insertObject: any) {
    await foodieRepo.createFoodie(insertObject);
};


export {
    getFoodieByUsername,
    createFoodie
};