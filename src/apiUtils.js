export const parseLoginErrors = (error) => {
            if(error.response.body.detail){
                if(error.response.body.detail.includes('password') && !error.response.body.detail.includes('username') ){
                    parsedErrors['password'] = error.response.body.detail;
                }if(error.response.body.detail.includes('username') && !error.response.body.detail.includes('password') ){
                    parsedErrors['username'] = error.response.body.detail;
                }
            }
            if(error.response.body.message){
                parsedErrors['username'] = error.response.body.message;
                parsedErrors['password'] = error.response.body.message;
            }
            return parsedErrors;
}

export const parseApiErrors = (error, amountId) => {
    return error.response.body.violations.reduce(
        (parsedErrors, violation) => {
            parsedErrors[amountId] = violation['message'];
            return parsedErrors;
        },
        {}
    )
};

export const parseErrors = (error) => {
    return error.response.body.violations.reduce(
        (parsedErrors, violation) => {
            parsedErrors[violation['propertyPath']] = violation['message'];
            return parsedErrors;
        },
        {}
    );
};

export const parseUpdateErrors = (error) => {
    return error.response.body.violations.reduce(
        (parsedErrors, violation) => {
            parsedErrors = violation['message'];
            return parsedErrors;
        },
        {}
    );
};

let parsed_db_errors = null;
export const parse_db_errors = (error) => {
    parsed_db_errors = error.response.body["hydra:description"]
    return parsed_db_errors;
};

let parsedErrors = {};
export const parseDbErrors = (error, amountKey) => {
    parsedErrors[amountKey] = error.response.body["hydra:description"]
    return parsedErrors;
};

export const hydraPageCount = (collection) => {
    if(!collection['hydra:view'][['hydra:last']]) {
        return 1;
    }

    return Number(
        collection['hydra:view']['hydra:last'].match(/page=(\d+)/)[1]
    );
}

const canCheckoutRoles = ['ROLE_USER', 'ROLE_ADMIN'];

export const canCheckout = (userData) => {
    return null !== userData
    && userData.roles.some(
         userRoles => canCheckoutRoles.includes(userRoles)
        );
}

export const linkBuilder = (category, page, min, max, order, input) => {
    let link = `/products?page=${page}`;

    if(category){
        link = link.concat(`&categories.id=${category}`)
    }if(min && max){
        link = link.concat(`&price[between]=${min}..${max}`)
    }if(min && !max){
        link = link.concat(`&price[gt]=${min}`)
    }if(max && !min){
        link = link.concat(`&price[lt]=${max}`)
    }if(order){
        link = link.concat(`&order[price]=${order}`)
    }if(input){
        link = link.concat(`&search=${input}`)
    }
    return link;
}