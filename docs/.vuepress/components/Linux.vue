<template lang="pug">
.linux
    .list
        .item(v-for='i in list', :key='i.name', :id='i.name')
            h3(:id='i.name')
                a.header-anchor(:href='`#${i.name}`') #
                | {{ i.name }}
            p.collect
                span.command(v-for='j in i.keys', :key='j', @click='go(j)') {{ j }}
</template>

<script>
import axios from 'axios'
export default {
    name: 'linux',
    data() {
        return {
            list: [
                {
                    name: '文件传输',
                    keys: [
                        'bye',
                        'ftp',
                        'ftpcount',
                        'ftpshut',
                        'ftpwho',
                        'ncftp',
                        'tftp',
                        'uucico',
                        'uucp',
                        'uupick',
                        'uuto',
                        'scp',
                    ],
                },
                {
                    name: '备份压缩',
                    keys: [
                        'ar',
                        'bunzip2',
                        'bzip2',
                        'bzip2recover',
                        'compress',
                        'cpio',
                        'dump',
                        'gunzip',
                        'gzexe',
                        'gzip',
                        'lha',
                        'restore',
                        'tar',
                        'unarj',
                        'unzip',
                        'zip',
                        'zipinfo',
                    ],
                },
                {
                    name: '文件管理',
                    keys: [
                        'diff',
                        'diffstat',
                        'file',
                        'find',
                        'git',
                        'gitview',
                        'ln',
                        'locate',
                        'lsattr',
                        'mattrib',
                        'mc',
                        'mcopy',
                        'mdel',
                        'mdir',
                        'mktemp',
                        'mmove',
                        'mread',
                        'mren',
                        'mshowfat',
                        'mtools',
                        'mtoolstest',
                        'mv',
                        'od',
                        'paste',
                        'patch',
                        'rcp',
                        'rhmask',
                        'rm',
                        'slocate',
                        'split',
                        'tee',
                        'tmpwatch',
                        'touch',
                        'umask',
                        'whereis',
                        'which',
                        'cat',
                        'chattr',
                        'chgrp',
                        'chmod',
                        'chown',
                        'cksum',
                        'cmp',
                        'cp',
                        'cut',
                        'indent',
                    ],
                },
                {
                    name: '磁盘管理',
                    keys: [
                        'cd',
                        'df',
                        'dirs',
                        'du',
                        'edquota',
                        'eject',
                        'lndir',
                        'ls',
                        'mcd',
                        'mdeltree',
                        'mdu',
                        'mkdir',
                        'mlabel',
                        'mmd',
                        'mmount',
                        'mrd',
                        'mzip',
                        'pwd',
                        'quota',
                        'quotacheck',
                        'quotaoff',
                        'quotaon',
                        'repquota',
                        'rmdir',
                        'rmt',
                        'stat',
                        'tree',
                        'umount',
                    ],
                },
                {
                    name: '磁盘维护',
                    keys: [
                        'badblocks',
                        'cfdisk',
                        'dd',
                        'e2fsck',
                        'ext2ed',
                        'fdisk',
                        'fsck.ext2',
                        'fsck',
                        'fsck.minix',
                        'fsconf',
                        'hdparm',
                        'losetup',
                        'mbadblocks',
                        'mformat',
                        'mkbootdisk',
                        'mkdosfs',
                        'mke2fs',
                        'mkfs.ext2',
                        'mkfs',
                        'mkfs.minix',
                        'mkfs.msdos',
                        'mkinitrd',
                        'mkisofs',
                        'mkswap',
                        'mpartition',
                        'sfdisk',
                        'swapoff',
                        'swapon',
                        'symlinks',
                        'sync',
                    ],
                },
                {
                    name: '文本处理',
                    keys: [
                        'awk',
                        'col',
                        'colrm',
                        'comm',
                        'csplit',
                        'ed',
                        'egrep',
                        'ex',
                        'fgrep',
                        'fmt',
                        'fold',
                        'grep',
                        'ispell',
                        'jed',
                        'joe',
                        'join',
                        'look',
                        'mtype',
                        'pico',
                        'rgrep',
                        'sed',
                        'sort',
                        'spell',
                        'tr',
                        'uniq',
                        'vi',
                        'wc',
                    ],
                },
                {
                    name: '网络通讯',
                    keys: [
                        'dip',
                        'getty',
                        'mingetty',
                        'ppp-off',
                        'telnet',
                        'uulog',
                        'uustat',
                        'uux',
                        'cu',
                        'dnsconf',
                        'efax',
                        'httpd',
                        'ip',
                        'ifconfig',
                        'mesg',
                        'minicom',
                        'nc',
                        'netconf',
                        'netconfig',
                        'netstat',
                        'ping',
                        'pppstats',
                        'samba',
                        'setserial',
                        'shapecfg(shaper configuration)',
                        'smbd(samba daemon)',
                        'statserial(status ofserial port)',
                        'talk',
                        'tcpdump',
                        'testparm(test parameter)',
                        'traceroute',
                        'tty(teletypewriter)',
                        'uuname',
                        'wall(write all)',
                        'write',
                        'ytalk',
                        'arpwatch',
                        'apachectl',
                        'smbclient(samba client)',
                        'pppsetup',
                    ],
                },
                {
                    name: '设备管理',
                    keys: ['dumpkeys', 'loadkeys', 'MAKEDEV', 'rdev', 'setleds'],
                },
                {
                    name: '电子邮件与新闻组',
                    keys: [
                        'archive',
                        'ctlinnd',
                        'elm',
                        'getlist',
                        'inncheck',
                        'mail',
                        'mailconf',
                        'mailq',
                        'messages',
                        'metamail',
                        'mutt',
                        'nntpget',
                        'pine',
                        'slrn',
                        'X WINDOWS SYSTEM',
                        'reconfig',
                        'startx(start X Window)',
                        'Xconfigurator',
                        'XF86Setup',
                        'xlsatoms',
                        'xlsclients',
                        'xlsfonts',
                    ],
                },
                {
                    name: '其他命令',
                    keys: ['yes'],
                },
            ],
            keyMap: null,
        }
    },
    methods: {
        go(command) {
            const c = command.split('(')[0]
            let url
            if (!this.keyMap[c]) url = `https://www.runoob.com/linux/linux-comm-${c}.html`
            else url = `https://wangchujiang.com/linux-command/c${this.keyMap[c].p}.html`
            window.open(url)
        },
    },
    mounted() {
        const body = {
            url: 'https://unpkg.com/linux-command/dist/data.json',
        }
        axios(body).then(({ data }) => {
            this.keyMap = data
        })
    },
}
</script>

<style scoped lang="stylus">
.linux {
    .list {
        .item {
            line-height 1.7
            h3 {
                margin-top -3.1rem
                padding-top 4.6rem
                margin-bottom 0
            }
            .collect {
                word-break break-word
            }
            .command {
                display inline-block
                font-weight 500
                color #3eaf7c
                text-decoration none
                cursor pointer
                margin-right 10px
                &:hover {
                    text-decoration underline
                }
            }
        }
    }
}
</style>
