# pern-tea-shop
## Description
Pern tea shop is a fullstack project, that uses PERN stack. Nest js is used as backend Node js framework. Project also has deployment on heroku, where you can try it out.
### Pay attention!
Almost every project image is included via url, so you may see empty or alt images somewhere.

## Database map
<img alt='db_map' src="https://github.com/Buor/pern-tea-shop/blob/master/Project%20Assets/databaseMap.png"/>

## Entities description
### Product
Product is a main entity that represents shop product, that customers may want to buy.

### Product Info
Product info entity represents additional info for every product, that user can view on product page.

### Basket
Basket is entity that represents user's basket. Basket contains different product that user is going to buy. 

### Type
Type entity represents product type, for example, tea, coffee, etc. Type used to navigate through different type pages on frontend.

### Type Values
Type Values entity represents different aspects, that only bound to one type. For example, tea can have color: black, green, yellow etc. But coffee type can have only a few colors. So, we need to specify type values for each product type. Product types are used by filter system.

### Brand
Brand is a simple entity that represents product brand.

### Rating
Rating entity represents users' rates for products.

### User
Simple entity that represents user 

### User Data
Additional entity to user that contains different user information, such as first name, second name, etc.


## Roadmap
- Backend
  - Create entities :white_check_mark:
  - Connect typeorm :white_check_mark:
  - Switch to nest js :white_check_mark:
  - Create base routes for every entity :black_square_button:
- Frontend
  - Main page
    - Create navbar :white_check_mark:
    - Implement different navbar states depending on authorization :white_check_mark:
    - Create products wrapper and make it adaptive :white_check_mark:
    - Bind categories to sidebar :black_square_button:
    - Implement different sections with products (at least 3) :black_square_button:
  - Product page
    - Implement base Product page :black_square_button:
    - Make HTML adaptive :black_square_button:
    - Implement filtering :black_square_button:
    - Create advanced products wrapper 
      - Make it adaptive :black_square_button:
      - Configure different additional functionalities
        - Add product to favourites :black_square_button:
    - Implement pagination :black_square_button:
  - Basket page
    - Implement products list :black_square_button:
    - Add possibility to change products amount :black_square_button:
  - Order page
    - User contact data inputs :black_square_button:
    - Sections
      - Products section :black_square_button:
      - Delivery section :black_square_button:
      - Payment section :black_square_button:
      - Contacts of order's receiver :black_square_button: