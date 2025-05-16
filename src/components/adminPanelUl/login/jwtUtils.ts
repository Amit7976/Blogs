"use server"

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const JWT_SECRET = process.env.AUTH_SECRET || 'job_bo.o%st@606*00@2=0';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const verifyTokenForAdminPanel = async (): Promise<boolean> => {

    try {
        const cookieStore = cookies();
        const accessToken = cookieStore.get('jb_eap_wla_at')?.value;
        console.log("accessToken:", accessToken);


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        if (accessToken) {

            try {

                jwt.verify(accessToken, JWT_SECRET);
                return true;

            } catch (error) {

                console.log('Access token invalid');
                return false;

            }

        } else {

            console.log('Access token invalid');
            return false;

        }

    } catch (error) {

        console.error('Error in token verification:', error);
        return false;

    }

};
