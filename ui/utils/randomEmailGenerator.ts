const emailUsername: string = 'qwertyuiopoasdfghjklzxzcvbnm0123456789'
const service: string[] = ['gmail', 'mail', 'null', 'hacker', 'president', 'example', 'minister', 'usa', 'null', 'guns']
const domain: string[] = ['.com', '.am', '.org', '.co.uk', '.mil', '.jp', '.ge', '.fr', '.ua', '.net']

const getRandomNumber = (max: number): number => { // get random number from 0 to max
    return Math.round(Math.random() * max)
}

export const generateEmail = (length: number): string => {
    let newUsername = ''
    for (let i = 0; i <= length; i++) { // form random email username consisted of lowercase letters and numbers
        newUsername = newUsername + emailUsername[getRandomNumber(emailUsername.length - 1)]
    }
    
    const newService = service[getRandomNumber(service.length - 1)]
    const newDomain = domain[getRandomNumber(domain.length - 1)]

    return `${newUsername}@${newService}${newDomain}`
}