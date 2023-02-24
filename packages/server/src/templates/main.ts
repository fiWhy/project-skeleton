export interface Props {
  subject: string;
  title: string;
  content: string;
  buttons?: {
    href: string;
    text: string;
  }[];
  bottomCard?: {
    title: string;
    content: string;
    links?: {
      href: string;
      text: string;
    }[];
  };
}

export default `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
  lang="en"
>
  <head>
    <link
      rel="stylesheet"
      type="text/css"
      hs-webfonts="true"
      href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi"
    />
    <title>Email template</title>
    <meta property="og:title" content="Email template" />

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <style type="text/css">
      a {
        text-decoration: underline;
        color: inherit;
        font-weight: bold;
        color: #253342;
      }

      h1 {
        font-size: 56px;
      }

      h2 {
        font-size: 28px;
        font-weight: 900;
      }

      p {
        font-weight: 100;
      }

      td {
        vertical-align: top;
      }

      #email {
        margin: auto;
        width: 600px;
        background-color: white;
      }

      button {
        font: inherit;
        background-color: #ff7a59;
        border: none;
        padding: 10px;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 900;
        color: white;
        border-radius: 5px;
        box-shadow: 3px 3px #d94c53;
      }

      .subtle-link {
        font-size: 9px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #cbd6e2;
      }

      .content-button:nth-of-type(n+1) {
        margin-left: 15px;
      }
    </style>
  </head>

  <body
    bgcolor="#F5F8FA"
    style="
      width: 100%;
      margin: auto 0;
      padding: 0;
      font-family: Lato, sans-serif;
      font-size: 18px;
      color: #33475b;
      word-break: break-word;
    "
  >
    <! View in Browser Link -->

    <div id="email">
      <! Banner -->
      <table role="presentation" width="100%">
        <tr>
          <td align="center" style="color: white">
            <img
              alt="People"
              src="cid:header-image"
              width="400px"
              align="middle"
            />

            <h1<%= title %></h1>
          </td>
        </tr>
      </table>

      <! First Row -->

      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="10px"
        style="padding: 30px 30px 30px 60px"
      >
        <tr>
          <td>
            <h2><%= subject %></h2>
            <p>
              <%- content %>
            </p>
            <% if (locals.buttons) { %>
             <% buttons.forEach(function(button){ %>
              <a href="<%= button.href %>">
                <button class="content-btn"><%= button.text %></button>
              </a>
             <% }); %>
            <% } %>
          </td>
        </tr>
      </table>

      <% if (locals.bottomCard) { %>
      <! Banner Row -->
      <table
        role="presentation"
        bgcolor="#EAF0F6"
        width="100%"
        style="margin-top: 50px"
      >
        <tr>
          <td align="center" style="padding: 30px 30px">
            <h2><%= bottomCard.title %></h2>
            <p>
              <%- bottomCard.content %>
            </p>
             
            <% if (locals.bottomCard.links) { %>
             <% bottomCard.links.forEach(function(link){ %>
              <a href="<%= link.href  %>"><%= link.text %></a>
             <% }); %>
            <% } %>
          </td>
        </tr>
      </table>
      <% } %>
    </div>
  </body>
</html>`;
