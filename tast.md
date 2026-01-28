SPRINT 1
1. create a dirzzle db
- psql, username: postrgres, password: postgres, db: bmb-dev

2. create table categories
- id, name, category_id, description, image_url
- category can belong to a categiry

3. create product_details table
- width, height, depth, weight, image_url

4. create table products
- id, name, code, price, category_id, featured, active, product_details_id (required)

- all columns are required, 


SPRINT 2
- inmplement admin panel /admin/auth/login
- for admin module use a new feature folder: feautres-admin, auth should be then features-admin/auth/{components, api, helpers, hooks, ... etc}
- we should be able to add/edit/delete between all tables - assign relation between them
- inmplement a simple authroization layer for the admin
- users are added menualy by sql
- add a default user email: admin@example.com / password: admin
- layout should be shadcn ui feel. modern sleek simple, dont change the components only use them and you can install any of shadcn comepontns
- all forms should be build with react-hook-form. make reusable components. for example <FormInput<Schema> name="email" /> this should be fully typed FormInput will use Input component but FormInput will have context from useFromContext etc.

SPRINT 3
- in admin panel create a button to seed the data with @faker-js/faker
- seed 100 products, 6 parent categories, each parent category should have 4-6 sub categories


if you have any questions feel free to ask. each sprint we will check if evertyhing is ok

