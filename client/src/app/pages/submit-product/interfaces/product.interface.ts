import { User } from 'src/app/auth/interfaces/user-interface';
import { ResearchTeam } from './researchTeam.interface';
import { publication } from './publication.interface';
import { researchGrant } from './resaerchGrant.interface';

export interface Product {
    _id?: string;
    
    // fields just from DB - user is not fill them
    user?: User;
    applicationDate?: Date;

    //fields user fills
    projectTitleThatWasGranted: string;
    typeOfFundingsReceivedFromDsrc: string;
    catchyTitle: string;
    openingMotivatingSentence?: string;
    presentLink?: string;
    urlToAdd?: string;
    researchTeam: ResearchTeam[] | any;
    oneSentenceSummarizing?: string;
    summarizingSentences?: string;
    conclusion?: string;
    uploadBlog: string;
    uploadFigureOrVideo: string;
    publications: publication[] | any;
    researchGrants: researchGrant[] | any;
    SDG: string[];
    government?: string;
    internationalCoopreration?: string;
    volunteerWork?: string;
    developCourses?: string; 
    customFields?: { [key: string]: string };
}