const chefRepo = require('../repositories/chef');

async function getChefByUsername(userName: string) {
    const rows = await chefRepo.getChefByUsername(userName);
    return rows;
};

async function createChef(insertObject: any) {
    await chefRepo.createChef(insertObject);
};


export {
getChefByUsername,
createChef
}
