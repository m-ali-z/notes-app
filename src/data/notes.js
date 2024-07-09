"use server";
import db from "../lib/db";

export const saveNote = async (data, email) => {
  const { title, note } = data;

  db.run(
    `INSERT INTO notes (title, notes, email) VALUES (?, ?, ?)`,
    [title, note, email],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      const id = this.lastID; // get the id of the last inserted row
      console.log(`Rows inserted, ID ${id}`);
    }
  );
};

export const getNotes = async (email) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM notes WHERE email = ?`, [email], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// export const saveUser = async (user, email, providerId, provider) => {
//   // console.log(user, email, providerId, <provider></provider>);
//   return new Promise((resolve, reject) => {
//     const existingUser = db.get(`SELECT * FROM users WHERE email = ?`, [email]);
//     console.log(existingUser);
//     if (existingUser) {
//       // Update the user's information if they already exist

//       db.run(
//         `UPDATE users SET name = ?, image = ?, provider = ?, providerId = ? WHERE email = ?`,
//         [user.name, user.image, provider, providerId, email],
//         (err, rows) => {
//           console.log("updated");
//           if (err) {
//             reject(err);
//           } else {
//             resolve(rows);
//           }
//         }
//       );
//     } else {
//       // Insert a new user into the database

//       db.run(
//         `INSERT INTO users (name, email, image, provider, providerId) VALUES (?, ?, ?, ?, ?)`,
//         [user.name, email, user.image, provider, providerId],
//         (err, rows) => {
//           console.log("inserted");
//           if (err) {
//             reject(err);
//           } else {
//             resolve(rows);
//           }
//         }
//       );
//     }
//   });
// };

export const editNote = async (updatedNote) => {
  const { title, note, id } = updatedNote;
  console.log("Updated Note", updatedNote);
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE notes SET title=?,notes=? WHERE id=?`,
      [title, note, id],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

export const deleteNote = async (id) => {
  console.log("api", id);
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM notes WHERE id=?`, id, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
