// import mysql from 'mysql2/promise';

// export const db = mysql.createPool ({
//     host: 'localhost',
//     user:'root',
//     password:'rlagksthf1!',
//     database: 'coupang'
// });
import { createClient} from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);