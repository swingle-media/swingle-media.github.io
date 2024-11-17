const supabaseUrl = 'https://tvovvzdyqzoejawfiadg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2b3Z2emR5cXpvZWphd2ZpYWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NDc1ODYsImV4cCI6MjA0NzQyMzU4Nn0.IRA8e1Jg5LAdJzaGj-BOLnCRNv7bkcnEsBlZ13wnzLg';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('github-login').onclick = async () => {
    const { user, session, error } = await supabase.auth.signIn({
        provider: 'github',
    });

    if (error) {
        console.error('Auth error:', error.message);
    } else {
        // Перенаправление на страницу профиля после успешной аутентификации
        window.location.href = 'https://swingle-media.github.io/home';
    }
};