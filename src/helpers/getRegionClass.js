
function getRegionClass(currentRegion){
    switch (currentRegion){
        case 'Africa' :
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'geel';
        case 'Oceania':
            return 'paars';
    }
}

export default getRegionClass;