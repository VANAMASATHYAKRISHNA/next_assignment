import LoadingAnimation from "@/components/loadingAnimation";
import PopulationList from "@/components/populationList";
import { INationPopulation } from "@/models/nationPopulation";
import { getNationPopulation } from "@/services/population";
import { AxiosResponse } from "axios";
import { GetStaticProps } from "next";
import React from "react";

interface DataResponse {
    // Define the structure of the response data
    // Example: Assuming the response data has a property called 'data'
    data: any;
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const response: AxiosResponse<DataResponse> = await getNationPopulation();
        const nationPopulationList = response.data;
        return {
            props: {
                nationPopulationList,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                error: 'Failed to fetch data',
            },
        };
    }
};
interface IProps{
nationPopulationList:INationPopulation[],
error:string
}
const Population:React.FC<IProps> =({nationPopulationList,error})=>{
    return(
    <React.Fragment>
    <LoadingAnimation/>
    <div>
    <PopulationList nationPopulationList={nationPopulationList}/>
    </div>
    
    </React.Fragment>)

}
export default Population