document.getElementById('btn').onclick = function(){

    document.getElementById('output').style.display="block";

    let url = document.getElementById('url').value;
    let path = document.getElementById('path').value;
    let type = document.getElementById('type').value;
    
    let block1 = 
        'cd /etc/apache2/sites-available' + '\n' +
        'vi ' + url + '.conf'
    ;

    let el1 = document.getElementById('code-block-1');
    el1.innerHTML = block1;
    hljs.highlightBlock(el1);

    document.getElementById('conf').innerHTML = `${url}.conf`;

    // let path = type == 'laravel' ? 'api/public' : 'app'

    let block2 = 
`&lt;VirtualHost *:80&gt;
    ServerName ${url}
    ServerAlias www.${url}
    DocumentRoot ${path}

    &lt;Directory /&gt;
            Options FollowSymLinks
            AllowOverride None
    &lt;/Directory&gt;
    &lt;Directory ${path}&gt;
            Options Indexes FollowSymLinks MultiViews
            AllowOverride All
            Order allow,deny
            allow from all
            DirectoryIndex index.${type == 'laravel' ? 'php' : 'html'}
            Require all granted
    &lt;/Directory&gt;

    # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
    # error, crit, alert, emerg.
    # It is also possible to configure the loglevel for particular
    # modules, e.g.
    #LogLevel info ssl:warn

    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined

#        ErrorLog /var/log/apache2/$1/app_error.log
#        CustomLog /var/log/apache2/$1/app_access.log combined
RewriteEngine on
RewriteCond %{SERVER_NAME} =${url}
RewriteCond %{SERVER_NAME} =www.${url}
RewriteRule ^ https://${url}%{REQUEST_URI} [END,NE,R=permanent]
RewriteCond %{SERVER_NAME} =www.${url} [OR]
RewriteCond %{SERVER_NAME} =${url}
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
&lt;/VirtualHost&gt;`
    ;

    let el2 = document.getElementById('code-block-2');
    el2.innerHTML = block2;
    hljs.highlightBlock(el2);

    let block3 = 
`sudo a2ensite ${url}.conf
sudo a2dissite 000-default.conf
    
sudo a2enmod rewrite
    
sudo systemctl restart apache2`
    ;

    let el3 = document.getElementById('code-block-3');
    el3.innerHTML = block3;
    hljs.highlightBlock(el3);

    let el4 = document.getElementById('code-block-4');
    el4.innerHTML = 
`sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --apache`
    ;
    hljs.highlightBlock(el4);

    let el5 = document.getElementById('code-block-5');
    let laravel = 
`&lt;IfModule mod_rewrite.c&gt;
    &lt;IfModule mod_negotiation.c&gt;
        Options -MultiViews -Indexes
    &lt;/IfModule&gt;

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
&lt;/IfModule&gt;`
    ;

    let vue = 
`&lt;IfModule mod_rewrite.c&gt;
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
&lt;/IfModule&gt;`
    ;

    el5.innerHTML = type == 'laravel' ? laravel : vue;
    hljs.highlightBlock(el5);
}

function copy(id){
    var range, selection, worked;

    element = document.getElementById(id);

    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();        
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    try {
      document.execCommand('copy');
      // alert('text copied');
    }
    catch (err) {
      alert('unable to copy text');
    }
}
