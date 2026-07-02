# PowerShell script to download Stitch project screens (HTML and Screenshots)
$outputDir = "stitch_designs"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$screens = @(
    @{
        index = 1
        name = "Student_Dashboard_Overview"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzc3NDI3Yzg4ZThmMDRlYmI5ZDYyZjgyOWUyNmMyYzE5EgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLs2GsmdSrcXGocXPzvPcFJYDjw5ahgLZShZhkgJExmlgnskTIGiyRnxbs-5-CYg71B69jgqppcDuvYeftpYyGBLWVg1X-qiF_xqWYX10sC77kqj-_OKIkSFlTWdxlyMAyoJnxJ2gkYw45PaztMBJIegjNn2KHCY1qFuQzvKjAMwhGKyBaJUoRBdAy3V8LLnd1-hFHibRVwjULzqGghDYvLIGArxuqNUh0nk0z9k6SaPLUGqCtaF1OsZAfQ"
    },
    @{
        index = 2
        name = "Student_Profile_Personal_Portfolio"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NWExY2Q2MDhmZGMwOTI1ZDRhNjM4MTc3YTEyEgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLuboaYaOzIWr8jehJj_qYb50Mw5vJ8uHp-z_3ufbhp-YLYSoicKhYYu49ygHCKg6HccpC6SDSJuicz73MoZkoqoxIOGCjB9vp8itSgnaJb0DwSoAlI45qw78eyNQ5-B4NCQWgy-noWBfIW08N2zX8dy4-UmnGPnApC2GmjIfcltcGFPwQc_Q4xy4HCFfByKdAAhf-oSNpHJKfBYh9ZXdiRKqP1emQd9DStuUHZG6q8dflPMWPAyXejJcK4"
    },
    @{
        index = 3
        name = "Learning_Resources_Downloads_Library"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzhiNGUxNGI5NzA2ODQ1ZTBiMDBiMmYzMGU4M2U4OWY1EgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLt5j3_NSWeVWu6c_DnVOt4qAmfll8klwk4XXxZSI-msAi3ig9QNN5dkR6uFZalDRiHv7jVAiALe0zsIYYrGAo8ZKzCXquBwOaj59pmtcHYLNFv6_WaWS7N1-KuERo-yfb5jBPNGDvPw0ovPpyougZJvSk_JXQqAf10J4S2WSHAPDtCuiKLaN8ezHg95WTTYzfTfTv7mmqUemP3Nhw5IXez3ZciufSOX-bjIfdoxENHU_P3YyWKdYAUvZ2c"
    },
    @{
        index = 4
        name = "AI_Learning_Companion_Chat_Interface"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzY5ZDBhMDYxMDdhODQxNjJiMjMzN2QxYmM0MjQxYmNlEgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLvK4LtLmk0fIhS7tvLi4PLBqyIafqlRx7sfQrMDgRyLg8i1K9sgpnQ6GSNyP4Cjqn4ZO-cLQ7-KcN5DW-KMCVMqaxz063PcEtrRLSPcy0tvjdt1GYpXfuy3XxG1YrdkqQbEb1oqiY-Eoim76AenZNgPpC8EyJwa57RZBoqZlXOKtU4WdeZwe4UUfM_AeQFaTkbDL00F76X7q2jV5_BiA72FtB7WxdcCZwTJlHMSjt_IeHo3xepBm_iG-sw"
    },
    @{
        index = 5
        name = "Notifications_System_Updates"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzRiNDk0M2NiMTAyNjQzNGQ5OWU5NGYwN2QwMTZiZGM2EgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLsYHbe9Lbl84ONatnEDpvFCgS-wU175NZaJMGmNU4fF2iBuPtuUuhSaX6U9snm66iYxXZ7KNVptbvCDixyhThb3VdxK9eMY8tyDLIhQLFEU5MvanCc117jf0whkDrqEUk36VyMQI9W745b5SexLMhvd5odSOcfJXynNeueA1MkJpJHqlNYgTqR0WCGj42KIiLWrHPsTmWJ_NTJSwCcbe8GbPDs9gvRXCyqVVkBWv2wbtZbLiQjojIQDoaQ"
    },
    @{
        index = 6
        name = "Learning_Schedule_Calendar_View"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NWEyMWM1MWY0MDgwNTQ5ZmY4YzBlM2E5Y2U5EgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLsEy3MXQWEVmkRXw5P5NFc0WaVy14JWh9ka9U6uDHUnFsDzv7X6aMTnb44U6i5q6pEHEhMiEgxLGAkOqGfSAwX1WYrKWkpxIKT_UnEpPuXnkM736yVGum1P3dtrSvmFjp3aRWrWf_1SExpJN6-JHTUCDaZXnlEbzi6wUn_BGPmVnj8HxMP2ZSNqKAodqCoPK1EQJ2VhbhgYvzmz6vZ-ddXzE4Lo5SuOp_wa0AreVj_WohJau4BwhgW51HQ"
    },
    @{
        index = 7
        name = "Student_Learning_Page_Content_Player"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzJkN2MyZTMzMWM2NzRmMzRhMDRiMWYxODljOWM1MmMwEgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLvjt0SEHnOY7E7VxyOCPMapjj4_QK3uoNgoZFx266hLwjpUkFme9BF_HnkC2jscgLPsD6KT_OLuZ3Rcx7SZ71e9MpgHz-EaGSJSmlcC8sqotSQFf4iuRRV5QGjurJJbUTyjlQEAdlFsYNacbokyP8qM52beYj08x1xqwVGLw3hwJY5QPbpioNfYTcciewJsmYQbrP7BR-ggMXfi_gvw9jtN6wAaePM56oS_f0_SB-3oIvQyvO1PsgI0kVM"
    },
    @{
        index = 8
        name = "Course_Task_Assignment_Submission"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzBmYmYzZWZlYWFlNzRmZTJhZmU2M2VlNmNlOGVlOGQ4EgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLuWGLHgYwLq-WPpzIA9TKJR2BoiecBaHBWXw6BPDZVFeFsLOqG_z5nOe_cnMiPENRXhr_gRosUkKDt5qMvC3pJTD_jsjv-nKyN9oOYG5lzw8Hl04bMMfu4p4gacBRvSHpO_j3xUekYh3u2suXQGw1kwWIu9A4zyC5ARefTaR5H_h4C8PrrtkZ6jCU1PD6k8RBtYt2_9ogYov2DI7O_b22ZX5uxATEuVPRkKSTfOEQQZVjs_oeSULC_mbOQ"
    },
    @{
        index = 9
        name = "Progress_Analytics_Personal_Insights"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q2NjIwYWRjMGNlYjRlOGM4M2I0MzY0YzUxZDQ0N2FjEgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLseeCC9sGaIpKgcQa0QdakBCHwe0rCZjyU-atMpuOnYBvby9b8-_ARp8YZWVzhfEHePoemzIWRubs0gqdEl--OPaOEsx-3onO3SHOMdq5c5G0oEIEfhBwJh20praCoMcoZ4N8kYRTpab_jtvmiNRfw3pvRTh4rL3L2iUg2zMNvYU3OunUgrhUZd2O0q_3wZhht7J0bdSmCi6o3z2BNZoU9sR3zAHz9p-0J1J1N8biDsb4ZuZgCPkoIKBR8"
    },
    @{
        index = 10
        name = "Account_Settings_Preferences"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2RjZGFjZTE5ODMyMTQwNjY4ODkwNGNkMjViMDFiOWU3EgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLs3FY_OTaqvrOGN8lP0l9-WFXEhI5uCZvjJaGDq63R6Vo6IpS07NqqkOUF81d7zZOtndh8iMz7y4Y2Q6hVNnyuvVsDZDXT-57IU-Cciox3u6Uf3_kYS7CCoeXz5nQpGPTsf9JB3jJpnpp0CrOqcgDEhWt-fkYb4DCx21S1mbai_bTQj0drC70DY7TjX74Xez5gzGntr9sDJO7sTdNCx2Oe_7Dc1RMqjectZiMzotd9VeCwNU6I2IW53Jqc"
    },
    @{
        index = 11
        name = "My_Achievements_Certificates_Portfolio"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzExMzFiYjM3NzhhNzRhMTViMjUyZjUxYTM5NzkwZGFlEgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLvOa01EWwPE3LO242JAMFg8uSk3DfyLKJAhscPKHLHO9bgNophxwm8ZFpbr_TWemKoyvno4jDOicS3Gt0DXazsjuRuTsfNBXXLnDKkQTXdv0njF2uhtOT9b9N4Do9fOzI-KVYLB6ZB_0oZrjSPoO8Pfa__6pHdBzCY6XsbHTSsSbivBrQ6nGD1_PpfZHI5_n5BPwXb-SZtv-ZvDPuN9yu41ctcIl57U0AtQEV4Ho6fBuK4DivppGg2Qng"
    },
    @{
        index = 12
        name = "Module_Assessment_Quiz_Player"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Y0OThiNWZhMzc5MDQzNzE5ZmU0YjgxYWJiNmE4NTc1EgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLtnfVtBg4jU0NM06kOHcxfxmFgnifOdUSozxTRdhrYCF7GiUzX2fFGm--mljpF4N6Ivi-OwEVb6bFgH8Z1TlcoC3zTmjrIgBNuT6aji3Dbtbnr9bjOalDq1iFLsLoAguNY205cPlZWSzQIuTHzpVgmjCbW_GV7ZTV355vkMHgy5frt9qxk92Ywv8d6_498q9uGiBLmUV3lKME2p3CqK12eEnNi96nIWHU_FUlExtI0C42FaG27jLcJ2g-0"
    },
    @{
        index = 13
        name = "My_Courses_Learning_Library"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdlN2QyOTg2MjhhMjRiN2FhOTMxZDY1OGI0ZWZmMTIxEgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLtA1diruhmzKHQHTH6MxFn9934gQ40i8zMmkmmhCnNJ95WOPIjzg4I5Qq2zTyvz_U05_uRDcx_9VpOxDokimK4zge40jIeRp5HLMKRYgRTyvHyhg0uDJ3n5XNR_Mxam26EhDecEbssz_GcLL6acOoK9mdkPS8Unvn6OXmmy2Yl0fi1sK9TDEAEFVD9iyytgkwj4uJbBk9QSp_a4G6AdD5tI-XpFcT2KY3KknJu-bhksNoR9f0DSzEcMsSI"
    },
    @{
        index = 14
        name = "Course_Overview_Curriculum_Detail"
        htmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzI1YTNkOTJlODFjZjRlODliNWFkMzQ3MjA3MjZlNDE1EgsSBxCQ09GLrRUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjA5MjQzMzM1MTc4OTY5NTgw&filename=&opi=89354086"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLt1t0sF_QE53awiN6I35krGHUV7JaPFkyBA3h4cmOw71Tx8j1-CN3LsCsNf2CEv0byGUwCjJcIQsaVSqv5k0WjDGLNAkbfmqPVFz7g8SjyzK5xn0F5Ds4yC0Kd6pqxw3vL0wQUvwQtk0orbFycP9CNWB-BCJZHE0UV4JQCSd2Tu6eJKv9BED-f9vPl2HcTX5EAqMmoFMVlcLccQtvKnvIOVf542UxaEoKAS-wN4FRsL0MAYmcTb4_tsrmg"
    }
)

foreach ($s in $screens) {
    $idxStr = $s.index.ToString("00")
    
    # Download HTML
    $htmlPath = Join-Path $outputDir "${idxStr}_$($s.name).html"
    Write-Host "Downloading HTML to $htmlPath..."
    curl.exe -L -o $htmlPath $s.htmlUrl
    
    # Download Image
    $imgPath = Join-Path $outputDir "${idxStr}_$($s.name).png"
    Write-Host "Downloading Screenshot to $imgPath..."
    curl.exe -L -o $imgPath $s.imgUrl
}

Write-Host "All downloads completed successfully!"
