const calcAge = (dayBirth) => {
    const today = new Date();
    const dBirth = new Date(dayBirth);
    let age = today.getFullYear() - dBirth.getFullYear();
    const months = today.getMonth() - dBirth.getMonth();

    if(months < 0 || (months === 0 && today.getDate() < dBirth.getDate())) {
        age--;
    }

    return age;
}

export default calcAge