// this file is data.sql

db.createUser(
    {
        user : "ainaa",
        pwd : "ainaa",
        roles : [
            {
                role : "roleWrite",
                db : "ainaa"
            }
        ]
    }
)