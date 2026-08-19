
# FarmTrack

FarmTrack is a farm management web app that lets farmers organize their animals into structures (barns, stables, coops, etc.) and keep a history log for each animal, tracking health status, sales, and other events over time. Built as a MEN stack CRUD app (MongoDB, Express, Node, EJS) with session-based authentication. Each user only has access to their own farm data.

## User Stories

### Auth
- As a guest, I can sign up for an account so I can manage my farm.
- As a guest, I can log in so I can access my saved data.
- As a user, I can log out to end my session.

### Structures
- As a user, I can view a list of all my structures (barns/stables/coops) so I can see my farm layout.
- As a user, I can create a new structure so I can organize my animals.
- As a user, I can view details of a single structure, including the animals inside it.
- As a user, I can edit a structure's info so I can keep it up to date.
- As a user, I can delete a structure so I can remove ones I no longer use.

### Animals
- As a user, I can add a new animal to a structure so I can track it.
- As a user, I can view a list of animals in a structure.
- As a user, I can view a single animal's details, including its log history.
- As a user, I can edit an animal's info (species, breed, status, etc.) so I can keep records accurate.
- As a user, I can delete an animal so I can remove it from my farm.

### Log Entries
- As a user, I can add a log entry to an animal (e.g. vet visit, sold, died) so I can track its history.
- As a user, I can view all log entries for an animal.
- As a user, I can edit a log entry so I can correct mistakes.
- As a user, I can delete a log entry so I can remove incorrect records.

### Authorization
- As a user, I cannot see or manage another user's structures, animals, or log entries.
- As a guest, I cannot create, edit, or delete any data.

## ERD

<img width="825" height="650" alt="erd" src="https://github.com/user-attachments/assets/bbb62ccf-84e3-4ea9-9a0c-8a636745226a" />


## Wireframes

<img width="1798" height="727" alt="wireframe" src="https://github.com/user-attachments/assets/abe205f1-961d-4c8e-910a-e59ecf9dd921" />

## Technologies

- Node.js
- Express
- MongoDB / Mongoose
- EJS
- HTML / CSS / JavaScript

## Next Steps

*(to be added later)*
