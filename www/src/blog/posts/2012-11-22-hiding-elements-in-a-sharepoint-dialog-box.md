---
title: Hiding Elements in a SharePoint Dialog Box
tags:
  - sharepoint
description: Elements added to a SharePoint 2010 master page may show up in every dialog box. Learn how to remove them from dialog boxes.
---

Have you tried to add elements to a SharePoint 2010 master page and then noticed they also appear in every dialog box?

Microsoft recommends you do something like this to hide the element in the dialog box:

```html
<div class="s4-notdlg">
  [your text]
</div>
```

where `s4-notdlg` is what hides the elements and its child elements in the dialog box.

If you're having trouble with this, or if you have several custom elements scattered throughout your master page, check out Heather Solomon's [alternative method](http://blog.sharepointexperience.com/2011/09/23/hide-page-elements-sharepoint-dialog-box/).
