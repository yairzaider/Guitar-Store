const db = require("./database");

// this is the guitar inventory data
const guitars = [
    { id: 1, name: 'Fender Stratocaster', price: 599, image: '/images/fender_stratocaster.png',stock : 2 },
    { id: 2, name: 'Gibson Les Paul', price: 999, image: '/images/gibson_les_paul.png',stock : 20  },
    { id: 3, name: 'Ibanez RG', price: 799, image: '/images/ibanez_rg.png',stock : 20  },
    { id: 4, name: 'PRS USA', price: 799, image: '/images/prs_usa.png',stock : 20  },
    { id: 5, name: 'Heritage Custom', price: 4367, image: '/images/heritage_costum.png' ,stock : 20 },
    { id: 6, name: 'Harmony USA', price: 1804, image: '/images/harmony_usa.png',stock : 20  },
    { id: 7, name: 'Heritage Standard', price: 2672, image: '/images/heritage_standard.png' ,stock : 20 },
    { id: 8, name: 'Music Man', price: 3995, image: '/images/music_man.png' ,stock : 20 },
    { id: 9, name: 'Sterling Man', price: 275, image: '/images/sterling_man.png' ,stock : 20 },
    { id: 10, name: 'Fender Squire', price: 310, image: '/images/fender_squire.png' ,stock : 20 },
    { id: 11, name: 'Jackson Dinky', price: 296, image: '/images/jackson_dinky.png' ,stock : 20 },
    { id: 12, name: 'Epiphone Les Paul', price: 344, image: '/images/epiphone_les_paul.png' ,stock : 20 },
    { id: 13, name: 'Squier Affinity', price: 405, image: '/images/squier_affinity.png' ,stock : 20},
    { id: 14, name: 'Ibanez Azes', price: 409, image: '/images/ibanez_azes.png',stock : 20 },
    { id: 15, name: 'Squier Classic Vibe', price: 427, image: '/images/squier_classic_vibe.png',stock : 20  },
    { id: 16, name: 'Epiphone SG', price: 449, image: '/images/epiphone_sg.png',stock : 20  },
    { id: 17, name: 'Fender Player', price: 658, image: '/images/fender_player.png' ,stock : 20},
    { id: 18, name: 'Gretsch Streamliner', price: 749, image: '/images/gretsch_streamliner.png',stock : 20  },
    { id: 19, name: 'Gretsch Electromatic', price: 849, image: '/images/gretsch_electromatic.png',stock : 20  },
    { id: 20, name: 'Epiphone Sheraton', price: 999, image: '/images/epiphone_sheraton.png' ,stock : 20 },
    { id: 21, name: 'Yamaha Pacific', price: 1199, image: '/images/yamaha_pacific.png',stock : 20  },
    { id: 22, name: 'Ibanez Ichika', price: 1299, image: '/images/ibanez_ichika.png' ,stock : 20 },
    { id: 23, name: 'Epiphone Casino', price: 1399, image: '/images/epiphone_casino.png',stock : 20  },
    { id: 24, name: 'Fender Telecaster', price: 658, image: '/images/fender_telecaster.png' ,stock : 20 },
    { id: 25, name: 'Jackson Adrian', price: 749, image: '/images/jackson_adrian.png',stock : 20  },
    { id: 26, name: 'Jackson Soloist', price: 749, image: '/images/jackson_soloist.png' ,stock : 20 },
    { id: 27, name: 'Charval Pro', price: 820, image: '/images/charval_pro.png' ,stock : 20 },
    { id: 28, name: 'Epiphone Whilshire', price: 1399, image: '/images/epiphone_whilshire.png',stock : 20  },
    { id: 29, name: 'Ibanez Flat', price: 1299, image: '/images/ibanez_flat.png',stock : 20  },
    { id: 30, name: 'Ibanez Genesys', price: 1199, image: '/images/ibanez_genesys.png',stock : 20  },
    { id: 31, name: 'Fender Aerodyne', price: 1090, image: '/images/fender_aerodyne.png',stock : 20  },
    { id: 32, name: 'Epiphone Dave Mustaine', price: 1890, image: '/images/epiphone_dave.png',stock : 20  },
    { id: 33, name: 'Ibanez Pat', price: 1720, image: '/images/ibanez_pat.png' ,stock : 20 },
    { id: 34, name: 'Ibanez George Benson', price: 2100, image: '/images/ibanez_george.png',stock : 20  },
    { id: 35, name: 'Ibanez Prestige', price: 1800, image: '/images/ibanez_prestige.png' ,stock : 20 },


];


const acoustic_guitars = [{ id: 36, name: 'Yamaha F310', price: 270, image: '/acoustic_images/yamaha310.png',stock : 10 },
    { id: 37, name: 'Squier Dreadnought', price: 300, image: '/acoustic_images/squier_dreadnought.png',stock : 5  },
    { id: 38, name: 'Bromo Apalacian', price: 199, image: '/acoustic_images/apalacian.png',stock : 7  },
    { id: 39, name: 'Epiphone DR100', price: 250, image: '/acoustic_images/epiphone_dr100.png',stock : 5  },
    { id: 40, name: 'Fender FA25', price: 350, image: '/acoustic_images/fender_fa25.png' ,stock : 16 },
    { id: 41, name: 'Yamaha Natural', price: 200, image: '/acoustic_images/yamaha_natural.png',stock : 8  },
    { id: 42, name: 'Yamaha Tobacco', price: 1050, image: '/acoustic_images/yamaha_tobacco.png' ,stock : 13 },
    { id: 43, name: 'Bromo Tahoma', price: 980, image: '/acoustic_images/bromo_tahoma.png',stock : 10  },
    { id: 44, name: 'Fender Redondo', price: 700, image: '/acoustic_images/fender_redondo.png',stock : 19  },
    { id: 45, name: 'Gretch Dandy', price: 450, image: '/acoustic_images/gretch_dandy.png',stock : 12  },
    { id: 46, name: 'Bromo Rocky', price: 350, image: '/acoustic_images/bromo_rocky.png',stock : 15  },
    { id: 47, name: 'Yamaha Sunburst', price: 250, image: '/acoustic_images/yamaha_sunburst.png',stock : 11  },
    { id: 48, name: 'Fender Belmont', price: 300, image: '/acoustic_images/fender_belmont.png',stock : 14  },
    { id: 49, name: 'Takamine NS', price: 400, image: '/acoustic_images/takamine_ns.png',stock : 17  },


];




// Insert electricguitars into the database
db.serialize(() => {
    db.run("DELETE FROM guitars", (err) => {
        if (err) {
            console.error("Error clearing the table:", err.message);
        } else {
            console.log("Existing data cleared.");
        }

        const stmt = db.prepare("INSERT INTO guitars (id, name, price, image, stock) VALUES (?, ?, ?, ?, ?)");
        guitars.forEach((guitar) => {
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
            console.log("Guitar inventory added to the database.");
            db.close();
        });
    });
});