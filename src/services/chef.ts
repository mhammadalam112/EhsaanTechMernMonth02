const chefRepo = require('../repositories/chef');

async function getChefByUsername(userName: string) {
    const rows = await chefRepo.getChefByUsername(userName);
    return rows;
};

interface insertObject {
    first_name: string;
    last_name: string;
    username: string; 
    password: string; 
}

async function createChef(insertObject: insertObject) {
    await chefRepo.createChef(insertObject);
};


export {
getChefByUsername,
createChef
}
