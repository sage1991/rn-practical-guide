export const CREATE_TABLE_PLACE = `
  create table if not exists places (
    id integer primary key not null,
    title text not null,
    image text not null,
    address text not null,
    lat real not null,
    lng real not null
  )
`
