# Summer-Sprint(Projects Corner)
## To run this project on your machine:

1. Create a virtual environment somewhere in your project directory

    ```
    python3 -m venv venv
    source venv/bin/activate
    ```
2. Install all dependencies from `projectcorner/requirements.txt`
3. Now, run `python manage.py runserver` from the projectcorner directory. If setup is fine till now, a django server would be running on localhost:8000
4. Ensure you have NodeJS installed

    ```
    # Using Ubuntu
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
5. In `projectcorner/frontend`, delete `node_modules` and `package-lock.json` if present.
6. Run
    ```
    npm install
    npm init
    ``` 
   in `projectcorner/frontend`
7. Now, run `npm start` to run the react app server on localhost:3000. 
