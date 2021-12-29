export const INSERT_INTO_PLACE = `
  insert into places (title, image, address, lat, lng) 
  values (?, ?, ?, ?, ?)
`

export const SELECT_ALL_FROM_PLACE = "select * from places"

export const DELETE_ALL_FROM_PLACE = "delete from place"
