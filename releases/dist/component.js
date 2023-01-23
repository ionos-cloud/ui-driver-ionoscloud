"use strict";

define("nodes/components/driver-ionoscloud/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAge3shLS0gVGhpcyBsaW5lIHNob3dzIHRoZSBkcml2ZXIgdGl0bGUgd2hpY2ggeW91IGRvbid0IGhhdmUgdG8gY2hhbmdlIGl0IC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPjxzcGFuPnt7ZHJpdmVyT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSB0aXRsZT0iQWNjb3VudCBBY2Nlc3MiCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbD0iQVBJIGVuZHBvaW50IGFuZCBjcmVkZW50aWFscy4iCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZE9uSW5pdD10cnVlCiAgICB9fQogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlVzZXJuYW1lLiBGYWxsYmFjayB0byBUb2tlbiBpZiBub3Qgc2V0LjwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy51c2VybmFtZQogICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iWW91ciBJT05PUyB1c2VybmFtZSIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+UGFzc3dvcmQuIEZhbGxiYWNrIHRvIFRva2VuIGlmIG5vdCBzZXQuPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0icGFzc3dvcmQiCiAgICAgICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5wYXNzd29yZAogICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iWW91ciBJT05PUyBwYXNzd29yZCIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5BUEkgVG9rZW4gKE92ZXJyaWRlcyBVc2VybmFtZSAmIFBhc3N3b3JkKTwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InBhc3N3b3JkIgogICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnRva2VuCiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9IllvdXIgSU9OT1MgdG9rZW4iCiAgICAgICAgICB9fQogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPllvdSBjYW4gdXNlIDxhIGhyZWY9Imh0dHBzOi8vZG9jcy5pb25vcy5jb20vY2xpLWlvbm9zY3RsL3N1YmNvbW1hbmRzL2F1dGhlbnRpY2F0aW9uL3Rva2VuLWdlbmVyYXRlIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIj5pb25vc2N0bDwvYT4gdG8gZ2VuZXJhdGUgYW4gQVBJIHRva2VuLjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkFQSSBFbmRwb2ludDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuZW5kcG9pbnQKICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iaHR0cHM6Ly9hcGkuaW9ub3MuY29tL2Nsb3VkYXBpL3Y2IgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5PcHRpb25hbDwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KCiAgICB7eyNhY2NvcmRpb24tbGlzdC1pdGVtIHRpdGxlPSJJbnN0YW5jZSBPcHRpb25zIgogICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw9IlZNIHNldHRpbmdzLiBTZXQgdXAgeW91ciBjb3JlIGNvdW50ICYgcmFtLiIKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kT25Jbml0PWZhbHNlCiAgICB9fQogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkxvY2F0aW9uPC9sYWJlbD4KICAgICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PWxvY2F0aW9uT3B0aW9ucwogICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uTGFiZWxQYXRoPSduYW1lJwogICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScKICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5sb2NhdGlvbgogICAgICAgICAgICB9fQogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNQVSBGYW1pbHk8L2xhYmVsPgogICAgICAgICAgICB7e25ldy1zZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9Y3B1T3B0aW9ucwogICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uTGFiZWxQYXRoPSduYW1lJwogICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScKICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5jcHVGYW1pbHkKICAgICAgICAgICAgfX0KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0zIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TZXJ2ZXIgWm9uZTwvbGFiZWw+CiAgICAgICAgICB7e25ldy1zZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXpvbmVPcHRpb25zCiAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uTGFiZWxQYXRoPSduYW1lJwogICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblZhbHVlUGF0aD0ndmFsdWUnCiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnNlcnZlclpvbmUKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMyI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Vm9sdW1lIFpvbmU8L2xhYmVsPgogICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD16b25lT3B0aW9ucwogICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkxhYmVsUGF0aD0nbmFtZScKICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJwogICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy52b2x1bWVab25lCiAgICAgICAgICB9fQogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5DUFUgY29yZSBjb3VudDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0LWludGVnZXIKICAgICAgICAgICAgdmFsdWU9Y29uZmlnLmNvcmVzCiAgICAgICAgICAgIHBsYWNlaG9sZGVyPTQKICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5SQU08L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgICB7e2lucHV0LWludGVnZXIgbWluPTI1NgogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnJhbQogICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICB9fQogICAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cC1hZGRvbiBiZy1kZWZhdWx0Ij5NaUI8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk11c3QgYmUgYSBtdWx0aXBsZSBvZiAyNTY8L3A+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlN0b3JhZ2UgU2l6ZTwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CiAgICAgICAgICAgIHt7aW5wdXQtaW50ZWdlciB2YWx1ZT1jb25maWcuZGlza1NpemUKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgfX0KICAgICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+R0I8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlN0b3JhZ2UgVHlwZTwvbGFiZWw+CiAgICAgICAgICB7e25ldy1zZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXN0b3JhZ2VUeXBlT3B0aW9ucwogICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkxhYmVsUGF0aD0nbmFtZScKICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJwogICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5kaXNrVHlwZQogICAgICAgICAgfX0KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+SW1hZ2UgQWxpYXMgb3IgSUQ8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuaW1hZ2UKICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9InVidW50dToyMC4wNCIKICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5Zb3UgY2FuIHVzZSA8YSBocmVmPSJodHRwczovL2RvY3MuaW9ub3MuY29tL2NsaS1pb25vc2N0bCIgdGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIgbm9yZWZlcnJlciI+aW9ub3NjdGwgaW1hZ2UgbGlzdCBbLUYgbmFtZT1vcGVyYXRpbmdTeXN0ZW1dPC9hPjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JbWFnZSBQYXNzd29yZDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InBhc3N3b3JkIgogICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuaW1hZ2VQYXNzd29yZAogICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iYWJjZGUxMjM0NSIKICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5DYW4gYmUgdXNlZCB0byBjb25uZWN0IHRvIHRoZSBWTTwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNsb3VkIGluaXQgY29uZmlndXJhdGlvbi48L2xhYmVsPgogICAgICAgICAgPHRleHRhcmVhIGlkPSJlZGl0b3IiIHZhbHVlPXt7Y29uZmlnLnVzZXJEYXRhfX0gb25jaGFuZ2U9e3thY3Rpb24gKG11dCBjb25maWcudXNlckRhdGEpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19IHJvd3M9IjMiIHN0eWxlPSJ3aWR0aDogMTAwJTsgcmVzaXplOiB2ZXJ0aWNhbCI+PC90ZXh0YXJlYT4KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5PcHRpb25hbC4gPGEgaHJlZj0iaHR0cHM6Ly9jbG91ZGluaXQucmVhZHRoZWRvY3MuaW8vZW4vbGF0ZXN0L3RvcGljcy9leGFtcGxlcy5odG1sIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIj5DbG91ZC1pbml0IERvY3VtZW50YXRpb248L2E+LjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KCiAgICB7eyNhY2NvcmRpb24tbGlzdC1pdGVtIHRpdGxlPSJOZXR3b3JrIE9wdGlvbnMiCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbD0iU2V0IHVwIHlvdXIgdGFyZ2V0IERhdGFjZW50ZXIsIExBTiwgYW5kIG90aGVyIG5ldHdvcmsgc2V0dGluZ3MgaGVyZS4iCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZE9uSW5pdD1mYWxzZQogICAgfX0KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+U1NIIFVzZXI8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuc3NoVXNlcgogICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk9wdGlvbmFsLiBVc2VyIHRvIGNvbm5lY3QgdG8gdmlhIFNTSC48L3A+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JT05PUyBEYXRhY2VudGVyIElEPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLmRhdGFjZW50ZXJJZAogICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk9wdGlvbmFsLCBVVUlELTQgZm9ybWF0LiBJZiB5b3Ugd2FudCB0byB1c2UgYW4gZXhpc3RpbmcgSU9OT1MgRGF0YWNlbnRlciB0byBob3N0IHRoaXMgVk0sIHlvdSBjYW4gcHJvdmlkZSBpdHMgSUQgaGVyZS48L3A+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPklPTk9TIExhbiBJRDwvbGFiZWw+CiAgICAgICAgICA8IS0tIFRPRE86IFRoaXMsIGlmIGhhcyBpbnB1dCwgc2hvdWxkIG1ha2UgRGF0YWNlbnRlcklEIGEgcmVxdWlyZWQgaW5wdXQgLS0+CiAgICAgICAgICB7e2lucHV0LWludGVnZXIKICAgICAgICAgICAgdmFsdWU9Y29uZmlnLmxhbklkCiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+T3B0aW9uYWwsIGludGVnZXIuIFRoZSBMQU4gdGhlIFZNIHdpbGwgYXR0YWNoIHRvLiBJZiBibGFuaywgYSBkZWZhdWx0IExBTiB3aWxsIGJlIGNyZWF0ZWQ8L3A+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+UHJpdmF0ZSBMQU48L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1jaGVjayIgc3R5bGU9IiI+CiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJjaGVja2JveCIKICAgICAgICAgICAgICAgICAgIG5hbWU9ImlzUHJpdmF0ZUxhbiIKICAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5wcml2YXRlTGFuCiAgICAgICAgICAgICAgICAgICBjbGFzcz0iZm9ybS1jaGVjay1pbnB1dCIKICAgICAgICAgICAgICAgICAgIGlkPSJwcml2YXRlTGFuQ2hlY2tib3giPgogICAgICAgICAgICA8bGFiZWwgY2xhc3M9ImZvcm0tY2hlY2stbGFiZWwiIGZvcj0icHJpdmF0ZUxhbkNoZWNrYm94Ij4KICAgICAgICAgICAgICBNYWtlIERlZmF1bHQgTEFOIFByaXZhdGUKICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlNob3VsZCB0aGUgTEFOIGNyZWF0ZWQgYnkgZGVmYXVsdCBiZSBtYWRlIHByaXZhdGU/PC9wPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPCEtLSAgTkFUIEdhdGV3YXkgc2V0dGluZ3MgIC0tPgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYgZm9ybS1ncm91cCI+CiAgICAgICAgPGxhYmVsPk5BVCBMYW5zIGFuZCBHYXRld2F5IElQczwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICA8ZGl2PgogICAgICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICAgICAgICB7e2lucHV0IHZhbHVlPW5ld0xhbklkIHBsYWNlaG9sZGVyPSJMYW4gSUQiIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCBtYi0yIGNvbCBzcGFuLTUgYXV0b3dpZHRoIn19CiAgICAgICAgICAgICAgICB7e2lucHV0IHZhbHVlPWdhdGV3YXlJcCBwbGFjZWhvbGRlcj0iR2F0ZXdheSBJUCIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIG1iLTIgY29sIHNwYW4tNSBhdXRvd2lkdGgifX0KICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSBjb2wgc3Bhbi0yIiB7e2FjdGlvbiAiYWRkR2F0ZXdheUlwIiBuZXdMYW5JZCBnYXRld2F5SXB9fT5BZGQ8L2J1dHRvbj4KICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIHt7I2VhY2ggY29uZmlnLmxhbnMgYXMgfGxhbnx9fQogICAgICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+TGFuIHt7bGFuLmlkfX0gR2F0ZXdheSBJUHM8L2xhYmVsPjxici8+CiAgICAgICAgICAgICAgICB7eyNlYWNoIGxhbi5nYXRld2F5SXBzIGFzIHxnYXRld2F5SXAgaW5kZXh8fX0KICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICAgICAgICAgICAgICB7e2lucHV0IGlkPShjb25jYXQgImdhdGV3YXlJcC0iIGxhbi5pZCAiLSIgaW5kZXgpIHZhbHVlPShtdXQgZ2F0ZXdheUlwKSBwbGFjZWhvbGRlcj0iR2F0ZXdheSBJUCIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIGNvbCBzcGFuLTExIGF1dG93aWR0aCIgcmVhZG9ubHk9dHJ1ZX19CiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG4gYnRuLW91dGxpbmUtZGFuZ2VyIGJ0bi1zbSBjb2wgc3Bhbi0xIiB7e2FjdGlvbiAiZGVsZXRlR2F0ZXdheUlwIiBsYW4gaW5kZXh9fT4tPC9idXR0b24+CiAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAge3svZWFjaH19CiAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYgZm9ybS1ncm91cCI+CiAgICAgICAgICA8bGFiZWw+TkFUIEdhdGV3YXkgUHVibGljIElQczwvbGFiZWw+PGJyLz4KCiAgICAgICAgICB7eyNlYWNoIGNvbmZpZy5uYXRQdWJsaWNJcHMgYXMgfHB1YmxpY0lwIGluZGV4fH19CiAgICAgICAgICAgIHt7aW5wdXQgaWQ9KGNvbmNhdCAicHVibGljSXAtIiBpbmRleCkgdmFsdWU9cHVibGljSXAgcGxhY2Vob2xkZXI9IlB1YmxpYyBJUCIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIG1iLTIgY29sIHNwYW4tMTAgYXV0b3dpZHRoIiByZWFkb25seT10cnVlfX0KICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG4gYnRuLW91dGxpbmUtZGFuZ2VyIGJ0bi1zbSBjb2wgc3Bhbi0yIiB7e2FjdGlvbiAiZGVsZXRlUHVibGljSXAiIGluZGV4fX0+LTwvYnV0dG9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgICB7e2lucHV0IGlkPSJuZXdQdWJsaWNJcCIgdmFsdWU9KG11dCBuZXdQdWJsaWNJcCkgcGxhY2Vob2xkZXI9Ik5ldyBQdWJsaWMgSVAiIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCBtYi0yIGNvbCBzcGFuLTEwIGF1dG93aWR0aCJ9fQogICAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG4gYnRuLW91dGxpbmUtZGFuZ2VyIGJ0bi1zbSBjb2wgc3Bhbi0yIiB7e2FjdGlvbiAiYWRkUHVibGljSXAiIG5ld1B1YmxpY0lwfX0+KzwvYnV0dG9uPgogICAgICAgIDwvZGl2PgogICAgPC9kaXY+CgoKICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQoKICAgICAgPCEtLSAgICBVbmNvbW1lbnQgbGluZXMgaGVyZSB0byBhZGQgQUNFIGVkaXRvciBmb3IgQ2xvdWRJTklULiBUT0RPLS0+CjwhLS0gICAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYWNlLzEuMTMuMS9hY2UuanMiIGludGVncml0eT0ic2hhNTEyLUlRbWlJbmVLVUpoVEpFbHBIT2xzcmIzanBGN3I1NEF6aENUaTdCVERMaUJWZzBmN21yRXFXVkNtT2VvcUt2NWhEZHlmM3JiYnhCVWdZZjR1M08vUWNRPT0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+LS0+CjwhLS0gICAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYWNlLzEuMTMuMS9leHQtbGFuZ3VhZ2VfdG9vbHMubWluLmpzIiBpbnRlZ3JpdHk9InNoYTUxMi15c3pUSjlLbytKR21VTlpZcEhTdFdwTWcyclNYcmgyV2pTU1pHeWR6cEhZK3FPUy8zblNnQStoQkhVSzNSdkxoZmp5Y0tMOFhXRW1mVUNab2QvbUVxQT09IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIiByZWZlcnJlcnBvbGljeT0ibm8tcmVmZXJyZXIiPjwvc2NyaXB0Pi0tPgo8IS0tICAgICAgPHNjcmlwdD4tLT4KPCEtLSAgICAgICAgLy8gYWNlLnJlcXVpcmUoImFjZS9leHQvbGFuZ3VhZ2VfdG9vbHMiKTstLT4KPCEtLSAgICAgICAgY29uc3QgZWRpdG9yID0gYWNlLmVkaXQoImVkaXRvciIpOy0tPgo8IS0tICAgICAgICBlZGl0b3Iuc2V0VGhlbWUoImFjZS90aGVtZS90d2lsaWdodCIpOy0tPgo8IS0tICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5zZXRNb2RlKCJhY2UvbW9kZS9jX2NwcCIpOy0tPgo8IS0tICAgICAgICBlZGl0b3Iuc2V0T3B0aW9ucyh7LS0+CjwhLS0gICAgICAgICAgZW5hYmxlQmFzaWNBdXRvY29tcGxldGlvbjogdHJ1ZSwtLT4KPCEtLSAgICAgICAgICBlbmFibGVTbmlwcGV0czogdHJ1ZSwtLT4KPCEtLSAgICAgICAgICBlbmFibGVMaXZlQXV0b2NvbXBsZXRpb246IHRydWUtLT4KPCEtLSAgICAgICAgfSk7LS0+CjwhLS0gICAgICAgIGVkaXRvci5yZXNpemUoKTstLT4KPCEtLSAgICAgIDwvc2NyaXB0Pi0tPgoKICAgIHt7IS0tIFRoaXMgZm9sbG93aW5nIGNvbnRhaW5zIHRoZSBOYW1lLCBMYWJlbHMgYW5kIEVuZ2luZSBPcHRpb25zIGZpZWxkcyAtLX19CiAgICA8ZGl2IGNsYXNzPSJvdmVyLWhyIj48c3Bhbj57e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3tmb3JtLW5hbWUtZGVzY3JpcHRpb24KICAgICAgbW9kZWw9bW9kZWwKICAgICAgbmFtZVJlcXVpcmVkPXRydWUKICAgIH19CgogICAge3tmb3JtLXVzZXItbGFiZWxzCiAgICAgIGluaXRpYWxMYWJlbHM9bGFiZWxSZXNvdXJjZS5sYWJlbHMKICAgICAgc2V0TGFiZWxzPShhY3Rpb24gJ3NldExhYmVscycpCiAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICB9fQoKICAgIHt7Zm9ybS1lbmdpbmUtb3B0cwogICAgICBtYWNoaW5lPW1vZGVsCiAgICAgIHNob3dFbmdpbmVVcmw9c2hvd0VuZ2luZVVybAogICAgfX0KICB7ey9hY2NvcmRpb24tbGlzdH19CgogIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIGVycm9ycyBwcm9kdWNlZCBieSB2YWxpZGF0ZSgpIGluIHRoZSBjb21wb25lbnQgLS19fQogIHt7dG9wLWVycm9ycyBlcnJvcnM9ZXJyb3JzfX0KCiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgdGhlIENyZWF0ZSBhbmQgQ2FuY2VsIGJ1dHRvbnMgLS19fQogIHt7c2F2ZS1jYW5jZWwKICAgIHNhdmU9KGFjdGlvbiAic2F2ZSIpCiAgICBjYW5jZWw9KGFjdGlvbiAiY2FuY2VsIikKICAgIGVkaXRpbmc9ZWRpdGluZwogIH19Cjwvc2VjdGlvbj4=";
  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var defaultRadix = 10;
  var defaultBase = 1024;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'ionoscloud',
    config: alias('model.ionoscloudConfig'),
    app: service(),
    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-ionoscloud/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);
    },
    actions: {
      updateNatLansToGatewaysMap: function updateNatLansToGatewaysMap() {
        var _this = this;

        this.config.natLansToGateways = "";
        var validIndex = 0;
        this.config.lans.forEach(function (lan, index) {
          var validIps = lan.gatewayIps.filter(function (ip) {
            return ip.trim() !== "";
          });

          if (validIps.length) {
            _this.config.natLansToGateways += "".concat(lan.id, "=[").concat(validIps.join(','), "]");
            validIndex += 1;

            if (index !== _this.config.lans.length - 1 && _this.config.lans[index + 1].gatewayIps.filter(function (ip) {
              return ip.trim() !== "";
            }).length) {
              _this.config.natLansToGateways += ':';
            }
          }
        });
      },
      addGatewayIp: function addGatewayIp(lanId, gatewayIp) {
        console.log("Adding " + gatewayIp + " to " + lanId);
        var existingLan = this.config.lans.filter(function (lan) {
          return lan.id === lanId;
        })[0];

        if (existingLan === undefined) {
          console.log("Making new LAN:" + lanId);
          this.config.lans.pushObject({
            id: lanId,
            gatewayIps: [gatewayIp]
          });
          existingLan = this.config.lans.slice(-1);
          console.log("Made a new LAN:" + existingLan.id);
        } else {
          console.log("Lan " + lanId + " already exists");
          existingLan.gatewayIps.pushObject(gatewayIp);
        }

        this.send('updateNatLansToGatewaysMap');
      },
      deleteGatewayIp: function deleteGatewayIp(lan, index) {
        lan.gatewayIps.removeAt(index);

        if (lan.gatewayIps.length === 0) {
          this.config.lans.removeObject(lan);
        }

        this.send('updateNatLansToGatewaysMap');
      },
      addPublicIp: function addPublicIp(newPublicIp) {
        this.config.natPublicIps.pushObject(newPublicIp);
        this.set("newPublicIp", "");
      },
      deletePublicIp: function deletePublicIp(index) {
        this.config.natPublicIps.removeAt(index);
      }
    },
    bootstrap: function bootstrap() {
      var config = get(this, 'globalStore').createRecord({
        type: 'ionoscloudConfig',
        cores: 2,
        ram: 2048,
        userData: '',
        token: '',
        username: '',
        password: '',
        endpoint: 'https://api.ionos.com/cloudapi/v6',
        natLansToGateways: "",
        lans: [],
        natPublicIps: []
      });
      set(this, 'model.ionoscloudConfig', config);
    },
    validate: function validate() {
      this._super();

      var errors = get(this, 'errors') || [];

      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (parseInt(get(this, 'config.memorySize'), defaultRadix) < defaultBase) {
        errors.push('Memory Size must be at least 1024 MB');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    },
    zoneOptions: [{
      name: 'AUTO',
      value: 'AUTO'
    }, {
      name: 'ZONE_1',
      value: 'ZONE_1'
    }, {
      name: 'ZONE_2',
      value: 'ZONE_2'
    }, {
      name: 'ZONE_3',
      value: 'ZONE_3'
    }],
    locationOptions: [{
      name: 'Las Vegas, USA',
      value: 'us/las'
    }, {
      name: 'Newark, USA',
      value: 'us/ewr'
    }, {
      name: 'Frankfurt, Germany',
      value: 'de/fra'
    }, {
      name: 'Berlin, Germany',
      value: 'de/txl'
    }, {
      name: 'London, UK',
      value: 'gb/lhr'
    }, {
      name: 'Logroño, Spain',
      value: 'es/vit'
    }, {
      name: 'Paris, France',
      value: 'fr/par'
    }],
    cpuOptions: [{
      name: 'Intel SKYLAKE (Europe)',
      value: 'INTEL_SKYLAKE'
    }, {
      name: 'AMD OPTERON (USA)',
      value: 'AMD_OPTERON'
    }, {
      name: 'Intel XEON (USA)',
      value: 'INTEL_XEON'
    }],
    storageTypeOptions: [{
      name: 'HDD',
      value: 'HDD'
    }, {
      name: 'SSD',
      value: 'SSD'
    }]
  });
});;
"use strict";

define("ui/components/driver-ionoscloud/component", ["exports", "nodes/components/driver-ionoscloud/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});