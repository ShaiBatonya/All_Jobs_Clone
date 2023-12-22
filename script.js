/* import function getDataFromLS, saveDataInLS from './models/localStorage_actions.js*/
import { getDataFromLS, saveDataInLS } from './models/localStorage_actions.js';

/* init jobs array */
let savedJobs = getDataFromLS("saved_job") ? getDataFromLS("saved_job") : [];

/* init jobs_id array */
let jobsid = getDataFromLS("job_id") ? getDataFromLS("job_id") : [];

/* elements that i catch from html and the url i work with */
const main_container = document.querySelector(".main_container");
const all_jobs_url = "https://remotive.com/api/remote-jobs?limit=50";
const Categories_url = "https://remotive.com/api/remote-jobs/categories";
const home_page = document.querySelector("#home_page");
const all_jobs_page = document.querySelector("#all_jobs_page");
const Saved_Jobs_page = document.querySelector("#Saved_Jobs_page");
const Categories = document.querySelector(".dropdown-menu");
const Search_btn = document.querySelector("#Search_btn");
const Search_input = document.querySelector("#Search_input");

/* function that shows the loading everytime */
const loader = () => {
    main_container.innerHTML =`<div class="loader">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>`
};

/* function that makes fetch to all jobs url */
const Fetch_Jobs = async () => {
    try {
        main_container.innerHTML = "";
        const response = await fetch(all_jobs_url);
        const data = await response.json();
        for (let job of data.jobs) {
            BuildJobsToHtml(job);
           
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        console.log("done");
    }
};

/* function that builds jobs to html and gets obl as a parameter */
const BuildJobsToHtml = (obj) => {  
    
    const new_div = document.createElement("div");
    new_div.setAttribute("class", "card");

    const com_name_div = document.createElement("div");
    com_name_div.setAttribute("class","card-header");
   
    const com_name = document.createElement("p");
    com_name_div.append(com_name);

    const job_logo = document.createElement("img");
    job_logo.setAttribute("src",obj.company_logo);

    const job_headline = document.createElement("h5");
    job_headline.style.textDecoration = 'underline';
    job_headline.style.fontWeight = 'bold';

    const job_salary = document.createElement("p");
    
    const job_description = document.createElement("div");
    job_description.style.overflow = "scroll";
    job_description.style.height = "20rem";
    job_description.style.width = "20rem";
    
    const div_btn = document.createElement("div");
    div_btn.setAttribute("class","div_btn");

    const move_to_job = document.createElement("a");
    move_to_job.setAttribute("class", "btn btn-success");
    move_to_job.setAttribute("id","link_btn");
    move_to_job.setAttribute("href",`${obj.url}`);
    move_to_job.setAttribute("target","_blank");
    move_to_job.style.fontWeight = 'bold';

    const saveJob_btn = document.createElement("button");
    saveJob_btn.setAttribute("class", "btn btn-danger");
    saveJob_btn.textContent = `Save This JOB`;
    saveJob_btn.style.fontWeight = 'bold';
    
        /* event listener that creates remove btn and replaces it with save job btn, then there is second and saves the arrays im lc/*  */
        saveJob_btn.addEventListener("click",()=> {

            savedJobs.push(obj);
            jobsid.push(obj.id);

            saveDataInLS("saved_job",savedJobs);
            saveDataInLS("job_id",jobsid);
        
        div_btn.replaceChild(remove_job_btn,saveJob_btn);
        new_div.style.backgroundColor = "rgba(110, 220, 183, 0.229)";

    });

    const remove_job_btn = document.createElement("button");
    remove_job_btn.setAttribute("class","btn btn-warning");
    remove_job_btn.textContent = "remove Job";
    remove_job_btn.style.fontWeight = 'bold';

    /* event listener remove job button that replaces by clicking save job and saves the arrays im lc */ 
    remove_job_btn.addEventListener("click",()=> {  

        let filtered_arr_saved_job = savedJobs.filter(jb => jb.id != obj.id);
        savedJobs = filtered_arr_saved_job;
        
        let filtered_arr_jobs_id = jobsid.filter(id => id != obj.id);
        jobsid = filtered_arr_jobs_id;

        saveDataInLS("saved_job",savedJobs);
        saveDataInLS("job_id",jobsid);

        div_btn.replaceChild(saveJob_btn,remove_job_btn);
        new_div.style.backgroundColor = "rgba(164, 163, 161, 0.171)";

       
    });
    
   /* if the array jobsid includes(obj.id) do div_btn.append(remove_job_btn,move_to_job); and if not so div_btn.append(saveJob_btn,move_to_job);*/
    if (jobsid.includes(obj.id)) {

        div_btn.append(remove_job_btn,move_to_job);
        new_div.style.backgroundColor = "rgba(110, 220, 183, 0.229)";
    
    } else {
            div_btn.append(saveJob_btn,move_to_job);
    };

    const type_job_div = document.createElement("div");
    type_job_div.setAttribute("class","card-footer");

    const type_job = document.createElement("p");
    type_job_div.append(type_job);

    com_name.append(`company name : ${obj.company_name}`);
    job_headline.append(`${obj.title}`);
    job_salary.append(`salary : ${obj.salary}`);
    job_description.innerHTML = obj.description;
    
    move_to_job.append("See This JOB");
    type_job.append(`Type : ${obj.job_type}`);

    new_div.append(com_name_div,job_logo,job_headline,job_salary,job_description,div_btn,type_job_div);
    main_container.append(new_div);

};

const buildSavedJobsToHtml = (obj)=> {
    const new_div = document.createElement("div");
    new_div.setAttribute("class", "card");

    const com_name_div = document.createElement("div");
    com_name_div.setAttribute("class","card-header");
   
    const com_name = document.createElement("p");
    com_name_div.append(com_name);

    const job_logo = document.createElement("img");
    job_logo.setAttribute("src",obj.company_logo);

    const job_headline = document.createElement("h5");
    job_headline.style.textDecoration = 'underline';
    job_headline.style.fontWeight = 'bold';

    const job_salary = document.createElement("p");
    
    const job_description = document.createElement("div");
    job_description.style.overflow = "scroll";
    job_description.style.height = "20rem";
    job_description.style.width = "20rem";
    
    const div_btn = document.createElement("div");
    div_btn.setAttribute("class","div_btn");

    const move_to_job = document.createElement("a");
    move_to_job.setAttribute("class", "btn btn-success");
    move_to_job.setAttribute("id","link_btn");
    move_to_job.setAttribute("href",`${obj.url}`);
    move_to_job.setAttribute("target","_blank");
    move_to_job.style.fontWeight = 'bold';

    const saveJob_btn = document.createElement("button");
    saveJob_btn.setAttribute("class", "btn btn-danger");
    saveJob_btn.textContent = `Save This JOB`;
    saveJob_btn.style.fontWeight = 'bold';
    
        /* event listener that creates remove btn and replaces it with save job btn, then there is second and saves the arrays im lc/*  */
        saveJob_btn.addEventListener("click",()=> {

            savedJobs.push(obj);
            jobsid.push(obj.id);

            saveDataInLS("saved_job",savedJobs);
            saveDataInLS("job_id",jobsid);
        
        div_btn.replaceChild(remove_job_btn,saveJob_btn);
        new_div.style.backgroundColor = "rgba(110, 220, 183, 0.229)";

    });

    const remove_job_btn = document.createElement("button");
    remove_job_btn.setAttribute("class","btn btn-warning");
    remove_job_btn.textContent = "remove Job";
    remove_job_btn.style.fontWeight = 'bold';

    /* event listener remove job button that replaces by clicking save job and saves the arrays im lc */ 
    remove_job_btn.addEventListener("click",()=> {  

        let filtered_arr_saved_job = savedJobs.filter(jb => jb.id != obj.id);
        savedJobs = filtered_arr_saved_job;
        
        let filtered_arr_jobs_id = jobsid.filter(id => id != obj.id);
        jobsid = filtered_arr_jobs_id;

        saveDataInLS("saved_job",savedJobs);
        saveDataInLS("job_id",jobsid);

        div_btn.replaceChild(saveJob_btn,remove_job_btn);
        new_div.style.backgroundColor = "rgba(164, 163, 161, 0.171)";

        new_div.remove(obj);
    });
    
   /* if the array jobsid includes(obj.id) do div_btn.append(remove_job_btn,move_to_job); and if not so div_btn.append(saveJob_btn,move_to_job);*/
    if (jobsid.includes(obj.id)) {

        div_btn.append(remove_job_btn,move_to_job);
        new_div.style.backgroundColor = "rgba(110, 220, 183, 0.229)";
    
    } else {
            div_btn.append(saveJob_btn,move_to_job);
    };

    const type_job_div = document.createElement("div");
    type_job_div.setAttribute("class","card-footer");

    const type_job = document.createElement("p");
    type_job_div.append(type_job);

    com_name.append(`company name : ${obj.company_name}`);
    job_headline.append(`${obj.title}`);
    job_salary.append(`salary : ${obj.salary}`);
    job_description.innerHTML = obj.description;
    
    move_to_job.append("See This JOB");
    type_job.append(`Type : ${obj.job_type}`);

    new_div.append(com_name_div,job_logo,job_headline,job_salary,job_description,div_btn,type_job_div);
    main_container.append(new_div);
};

Saved_Jobs_page.addEventListener("click", ()=> {
    if (savedJobs < 1 ) {
        alert("no liked jobs");
    } else {
        main_container.innerHTML = "";
        loader();
        setTimeout(() => {

            main_container.innerHTML = "";
    
            for (let jobslike of savedJobs) {
                buildSavedJobsToHtml(jobslike);
    
            }
            
        },1000);
        
    }
   
});



/* event listener that makes the loader and after 2 seconds call the fetch jobs function */
all_jobs_page.addEventListener("click", ()=> {
    main_container.innerHTML = "";
        loader();
    setTimeout(() => {
        Fetch_Jobs();
    },1000)
});

/* event listener that makes the loader and returns to the home page */
home_page.addEventListener("click", (event)=> {
    event.preventDefault();
    main_container.innerHTML = "";
    loader();
    setTimeout(() => {
       location.href = "home.html";

    },1000)
});

/* function that does fetch to the categories */
const Fetch_All_Categories = async ()=> {
    try {
        const response = await fetch(Categories_url);
        const data = await response.json();
        for (let name_job of data.jobs) {
            BuildCategoriesJobsToHtml(name_job);
        }
    } catch (error) {
        console.log(error)
    }
    finally {
        console.log("done");
    }
};

Fetch_All_Categories();

/* function that does fetch to the chosen li from the category */
 const Fetch_Categories = async (object)=> {
    try {
        main_container.innerHTML = "";
        loader();
        const response = await fetch(`https://remotive.com/api/remote-jobs?category=${object}`);
        const data = await response.json();
        const positionData = data.jobs;

        setTimeout(() => {
            main_container.innerHTML = "";
            for (let card of positionData) {
                BuildJobsToHtml(card);
            }
        },1000);

    } catch (error) {
        console.log(error);
    }
    finally {
        console.log("done");
    }
};

/* function that builds the categories in the ul html */
const BuildCategoriesJobsToHtml = (position) => {
    const li_job = document.createElement("li");
    li_job.setAttribute("class","dropdown-item");

    const a_in_li_job = document.createElement("a");
    a_in_li_job.setAttribute("class","dropdown-item");
    li_job.style.fontWeight = 'bold';
    
    li_job.append(a_in_li_job);

    li_job.append(position.name);
    Categories.append(li_job);

    /* li that get the Fetch_Categories */
    li_job.addEventListener("click",()=> {
        Fetch_Categories(position.name);
    });
};

/* event listener that checks if there is a value else sends a parameter to function Fetch_Search */
Search_btn.addEventListener("click", (event)=> {
    event.preventDefault();

    main_container.innerHTML = "";
    loader()

    if (Search_input.value == "") {
        alert("please enter a value");
        location.reload();
    } else {
        setTimeout(() => {
            main_container.innerHTML = "";
            Fetch_Search(Search_input.value)
        },2500);
    }
    
});

/* function that gets the input value as a parameter, does fetch and sends the search result to the function BuildJobsToHtml */
const Fetch_Search = async (search)=> {
    try {
        const response = await fetch(`https://remotive.com/api/remote-jobs?search=${search}`);
        const data = await response.json();
       
        if (data.jobs < 1) {
           alert("Please enter a valid value");
           window.location.href = "home.html";

        } else {

            for (let Search_cards of data.jobs) {
                BuildJobsToHtml(Search_cards);
              
            }
        }

    } catch (error) {
        console.log(error);
    } finally {
        console.log("done");
    }
};










