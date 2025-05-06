class ParticipantService{
    constructor(db){
        this.client = db.sequelize;
        this.Participant = db.Participant;
        this.db = db;
    }

    async getAll(){
        return await this.Participant.findAll();
    }

    async getAllParticipantNames(){
        return await this.Participant.findAll({
            attributes: ['firstName', 'lastName']
        });
    }

    async getParticipantDetailsByEmail(email){
        return await this.Participant.findOne({where:{email:email}});
    }

    async getWorkDetails(email){
        return await this.db.Work.findOne({where:{participantEmail:email}});
    }

    async getHomeDetails(email){
        return await this.db.Home.findOne({where:{participantEmail:email}});
    }

    async create(email, firstName, lastName, dob, companyName, salary, currency, country, city) {
        console.log("create participant");
        await this.db.Participant.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            dob: dob
        });
        console.log("create associated work");
        await this.db.Work.create({
            companyName: companyName,
            salary: salary,
            currency: currency,
            participantEmail: email  // Link using email
        });
        console.log("create home details");
        await this.db.Home.create({
            country: country,
            city: city,
            participantEmail: email  // Link using email
        });
    }

    
    async findByEmail(email){
        return await this.db.Participant.findOne({where: {email: email}});
    }

    async deleteByEmail(email){
        const participant = await this.findByEmail(email);
        await participant.destroy();
    }

    async updateByEmail(email, firstName, lastName, dob, companyName, salary, currency, country, city){
        const participant = await this.findByEmail(email);
        const work = await this.db.Work.findOne({where: {participantEmail: email}});
        const home = await this.db.Home.findOne({where: {participantEmail: email}});
        
        if(!participant || !work || !home){
            console.log("One of these are null: " + participant + " . "+ work + " . " + home);
            return null;
        }

        await participant.update({ firstName, lastName, dob });
        await work.update({ companyName, salary, currency });
        await home.update({ country, city });
        return await participant;
    }
}

module.exports = ParticipantService;