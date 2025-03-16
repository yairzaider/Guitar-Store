const db = require("./acousticdatabase");

const acoustic_guitars = [{ id: 36, name: 'Yamaha F310', price: 270, image: '/acoustic_images/yamaha310.png',stock : 10 },
    { id: 37, name: 'Squier Dreadnought', price: 300, image: '/acoustic_images/squier_dreadnought.png',stock : 5  },
    { id: 38, name: 'Bromo Apalacian', price: 199, image: '/acoustic_images/apalacian.png',stock : 7  },
    { id: 39, name: 'Epiphone DR100', price: 250, image: '/acoustic_images/epiphone_dr100.png',stock : 5  },
    { id: 40, name: 'Fender FA25', price: 350, image: '/acoustic_images/fender_fa25.png' ,stock : 16 },
    { id: 41, name: 'Yamaha Natural', price: 200, image: '/acoustic_images/yamaha_natural.png',stock : 8  },
    { id: 42, name: 'Yamaha Tobacco', price: 1050, image: '/acoustic_images/yamaha_tobacco.png' ,stock : 13 },
    { id: 43, name: 'Bromo Tahoma', price: 980, image: '/acoustic_images/bromo_tahoma.png',stock : 10  },
    { id: 44, name: 'Fender Redondo', price: 700, image: '/acoustic_images/fender_redondo.png',stock : 19  },
    { id: 45, name: 'Gretsch Dandy', price: 452, image: '/acoustic_images/gretsch_dandy.png',stock : 12  },
    { id: 46, name: 'Bromo Rocky', price: 350, image: '/acoustic_images/bromo_rocky.png',stock : 15  },
    { id: 47, name: 'Yamaha Sunburst', price: 250, image: '/acoustic_images/yamaha_sunburst.png',stock : 11  },
    { id: 48, name: 'Fender Belmont', price: 300, image: '/acoustic_images/fender_belmont.png',stock : 14  },
    { id: 49, name: 'Takamine NS', price: 400, image: '/acoustic_images/takamine_ns.png',stock : 17  },


];

db.serialize(() => {
    db.run("DELETE FROM acoustic_guitars", (err) => {
        if (err) {
            console.error("Error clearing the table:", err.message);
        } else {
            console.log("Existing data cleared.");
        }

        const stmt = db.prepare("INSERT INTO acoustic_guitars (id, name, price, image, stock) VALUES (?, ?, ?, ?, ?)");
        acoustic_guitars.forEach((guitar) => {
            if (guitar.stock === undefined) {
                guitar.stock = 20; // Set a default stock value if missing
            }
            stmt.run(guitar.id, guitar.name, guitar.price, guitar.image, guitar.stock, (err) => {
                if (err) {
                    console.error("Error inserting data:", err.message);
                }
            });
        });

        stmt.finalize(() => {
            console.log("Acoustic Guitar inventory added to the database.");
            db.close();
        });
    });
});