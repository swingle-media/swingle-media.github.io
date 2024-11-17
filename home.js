const supabaseUrl = 'https://tvovvzdyqzoejawfiadg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2b3Z2emR5cXpvZWphd2ZpYWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NDc1ODYsImV4cCI6MjA0NzQyMzU4Nn0.IRA8e1Jg5LAdJzaGj-BOLnCRNv7bkcnEsBlZ13wnzLg';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Проверка сессии
const session = supabase.auth.session();

if (!session) {
    window.location.href = 'auth.html';
} else {
    const user = session.user;

    // Здесь можно добавить логику для получения username и name
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('github_id', user.id)
        .single();

    if (!data) {
        // Если пользователя нет в базе, запрашиваем username и name
        const username = prompt("@username:");
        const name = prompt("name:");

        // Проверка на уникальность username
        const { data: existingUser  } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();

        if (existingUser ) {
            alert("Username has been used, try another.");
            window.location.href = 'auth.html';
        } else {
            // Добавляем нового пользователя
            const { error: insertError } = await supabase
                .from('users')
                .insert([{ username, name, github_id: user.id }]);

            if (insertError) {
                console.error('Add user error:', insertError.message);
            }
        }
    }
}

document.getElementById('logout').onclick = async () => {
 const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('login error:', error.message);
    } else {
        window.location.href = 'auth.html';
    }
}; 